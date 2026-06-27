/**
 * Log level type
 */
export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE';

/**
 * Log entry in history
 */
export interface LogEntry {
  id: string;
  timestamp: number;
  isoTime: string;
  level: LogLevel;
  namespace: string;
  message: string;
  data?: unknown;
}

/**
 * Current debug configuration
 */
export interface DebugConfig {
  enabled: boolean;
  level: LogLevel;
  prefix: string;
  version: string;
  maxHistorySize: number;
}

/**
 * Debug config change event
 */
export interface DebugConfigChangeEvent {
  config: Readonly<DebugConfig>;
  changedBy: 'console' | 'ui' | 'api';
}

/**
 * Log history change event
 */
export interface LogHistoryChangeEvent {
  entries: ReadonlyArray<LogEntry>;
  latest: LogEntry;
}

/**
 * Storage adapter interface
 */
export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * Log level rank for comparison
 */
export const LOG_LEVEL_RANK: Record<LogLevel, number> = {
  'ERROR': 0,
  'WARN': 1,
  'INFO': 2,
  'DEBUG': 3,
  'TRACE': 4,
};
