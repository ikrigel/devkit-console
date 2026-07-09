import type {
  LogLevel,
  LogEntry,
  DebugConfig,
  DebugConfigChangeEvent,
  LogHistoryChangeEvent,
  StorageAdapter,
} from './types';
import { LOG_LEVEL_RANK } from './types';
import { TypedEmitter } from './emitter';
import { LogHistory } from './history';
import { Logger } from './logger';
import { defaultStorageAdapter } from './storage';
import { STORAGE_KEY_PREFIX, DEFAULT_MAX_HISTORY_SIZE, VERSION } from './constants';

/**
 * Central debug manager — owns config, history, and both emitters
 */
export class DebugManager {
  private config: DebugConfig;
  private history: LogHistory;
  private storage: StorageAdapter;
  private loggers: Map<string, Logger> = new Map();

  readonly configEmitter = new TypedEmitter<DebugConfigChangeEvent>();
  readonly logEmitter = new TypedEmitter<LogHistoryChangeEvent>();

  constructor(storage: StorageAdapter = defaultStorageAdapter, initialLevel: LogLevel = 'INFO') {
    this.storage = storage;
    this.history = new LogHistory(DEFAULT_MAX_HISTORY_SIZE);
    this.config = {
      enabled: true,
      level: initialLevel,
      prefix: '@devkit-console',
      version: VERSION,
      maxHistorySize: DEFAULT_MAX_HISTORY_SIZE,
    };

    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const key = `${STORAGE_KEY_PREFIX}:config:v1`;
      const raw = this.storage.getItem(key);
      if (!raw) return;

      const saved = JSON.parse(raw) as Partial<DebugConfig>;
      if (saved.enabled !== undefined) this.config.enabled = saved.enabled;
      if (saved.level !== undefined && isValidLogLevel(saved.level)) {
        this.config.level = saved.level;
      }
    } catch {
      // Silently fail if storage is corrupted
    }
  }

  private persistToStorage(): void {
    try {
      const key = `${STORAGE_KEY_PREFIX}:config:v1`;
      this.storage.setItem(key, JSON.stringify(this.config));
    } catch {
      // Silently fail if storage is full or unavailable
    }
  }

  setLevel(level: LogLevel, source: 'console' | 'ui' | 'api' = 'api'): void {
    if (!isValidLogLevel(level)) return;
    this.config.level = level;
    this.persistToStorage();
    this.configEmitter.emit({
      config: Object.freeze({ ...this.config }),
      changedBy: source,
    });
  }

  enable(source: 'console' | 'ui' | 'api' = 'api'): void {
    this.config.enabled = true;
    this.persistToStorage();
    this.configEmitter.emit({
      config: Object.freeze({ ...this.config }),
      changedBy: source,
    });
  }

  disable(source: 'console' | 'ui' | 'api' = 'api'): void {
    this.config.enabled = false;
    this.persistToStorage();
    this.configEmitter.emit({
      config: Object.freeze({ ...this.config }),
      changedBy: source,
    });
  }

  getConfig(): Readonly<DebugConfig> {
    return Object.freeze({ ...this.config });
  }

  ns(namespace: string): Logger {
    if (!this.loggers.has(namespace)) {
      this.loggers.set(namespace, new Logger(namespace, this));
    }
    return this.loggers.get(namespace)!;
  }

  getNamespaces(): string[] {
    return Array.from(this.loggers.keys());
  }

  log(namespace: string, level: LogLevel, message: string, data?: unknown): void {
    if (!this.config.enabled) return;
    if (LOG_LEVEL_RANK[level] > LOG_LEVEL_RANK[this.config.level]) return;

    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      isoTime: new Date().toISOString(),
      level,
      namespace,
      message,
      data,
    };

    this.history.add(entry);
    this.logEmitter.emit({
      entries: Object.freeze([...this.history.getAll()]),
      latest: entry,
    });

    // Also log to browser console
    this.logToConsole(entry);
  }

  private logToConsole(entry: LogEntry): void {
    const prefix = `[${entry.namespace}]`;
    const logMethod = this.getConsoleMethod(entry.level);
    const style = this.getConsoleStyle(entry.level);

    if (entry.data !== undefined) {
      (console as any)[logMethod](`%c${prefix}%c ${entry.message}`, style, '', entry.data);
    } else {
      (console as any)[logMethod](`%c${prefix}%c ${entry.message}`, style, '');
    }
  }

  private getConsoleMethod(level: LogLevel): string {
    const methods: Record<LogLevel, string> = {
      ERROR: 'error',
      WARN: 'warn',
      INFO: 'info',
      DEBUG: 'log',
      TRACE: 'log',
    };
    return methods[level];
  }

  private getConsoleStyle(level: LogLevel): string {
    const colors: Record<LogLevel, string> = {
      ERROR: 'color: #ef4444; font-weight: bold;',
      WARN: 'color: #f59e0b; font-weight: bold;',
      INFO: 'color: #3b82f6;',
      DEBUG: 'color: #8b5cf6;',
      TRACE: 'color: #6b7280;',
    };
    return colors[level];
  }

  onConfigChange(listener: (event: DebugConfigChangeEvent) => void): () => void {
    return this.configEmitter.on(listener);
  }

  onLogChange(listener: (event: LogHistoryChangeEvent) => void): () => void {
    return this.logEmitter.on(listener);
  }

  getHistory(): readonly any[] {
    return this.history.getAll();
  }

  clearHistory(): void {
    this.history.clear();
    this.logEmitter.emit({
      entries: Object.freeze([]),
      latest: undefined,
    } as any);
  }

  exportLogs(format: 'json' | 'text'): string {
    return format === 'json' ? this.history.exportJSON() : this.history.exportText();
  }
}

/**
 * Type guard for LogLevel
 */
function isValidLogLevel(value: any): value is LogLevel {
  return ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'].includes(value);
}

/**
 * Create singleton instance
 */
let singletonInstance: DebugManager | null = null;

export function getDebugManager(): DebugManager {
  if (!singletonInstance) {
    singletonInstance = new DebugManager();
  }
  return singletonInstance;
}

export function createDebugManager(
  storage: StorageAdapter = defaultStorageAdapter,
  initialLevel: LogLevel = 'INFO'
): DebugManager {
  return new DebugManager(storage, initialLevel);
}
