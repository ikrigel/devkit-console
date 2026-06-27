import type { LogLevel, LogEntry } from './types';
import type { DebugManager } from './manager';
import { Logger } from './logger';

/**
 * window.debug global API
 */
export interface DebugGlobal {
  trace(): void;
  debug(): void;
  info(): void;
  warn(): void;
  error(): void;
  all(): void;
  disable(): void;
  enable(): void;
  setLevel(level: LogLevel): void;
  status(): void;
  version(): void;
  ns(namespace: string): Logger;
  history(): readonly LogEntry[];
  exportLogs(format: 'json' | 'text'): string;
  clearHistory(): void;
  getConfig(): any;
  _manager?: DebugManager;
}

/**
 * Install window.debug global
 */
export function installWindowGlobal(manager: DebugManager): void {
  const api: DebugGlobal = {
    trace() {
      manager.setLevel('TRACE', 'console');
      printBanner(manager);
    },
    debug() {
      manager.setLevel('DEBUG', 'console');
      printBanner(manager);
    },
    info() {
      manager.setLevel('INFO', 'console');
      printBanner(manager);
    },
    warn() {
      manager.setLevel('WARN', 'console');
      printBanner(manager);
    },
    error() {
      manager.setLevel('ERROR', 'console');
      printBanner(manager);
    },
    all() {
      manager.setLevel('TRACE', 'console');
      printBanner(manager);
    },
    disable() {
      manager.disable('console');
      console.log('%c[DevKit] Debug disabled', 'color: #6b7280;');
    },
    enable() {
      manager.enable('console');
      printBanner(manager);
    },
    setLevel(level: LogLevel) {
      manager.setLevel(level, 'console');
      printBanner(manager);
    },
    status() {
      printBanner(manager);
    },
    version() {
      const config = manager.getConfig();
      console.log(
        `%c[DevKit v${config.version}] Debug ${config.enabled ? 'enabled' : 'disabled'} at level ${config.level}`,
        'color: #3b82f6; font-weight: bold;'
      );
    },
    ns(namespace: string): Logger {
      return manager.ns(namespace);
    },
    history(): readonly LogEntry[] {
      return manager.getHistory();
    },
    exportLogs(format: 'json' | 'text'): string {
      return manager.exportLogs(format);
    },
    clearHistory(): void {
      manager.clearHistory();
      console.log('%c[DevKit] History cleared', 'color: #6b7280;');
    },
    getConfig(): any {
      return manager.getConfig();
    },
    _manager: manager,
  };

  (window as any).debug = api;
}

/**
 * Uninstall window.debug global
 */
export function uninstallWindowGlobal(): void {
  delete (window as any).debug;
}

/**
 * Print ASCII banner
 */
function printBanner(manager: DebugManager): void {
  const config = manager.getConfig();
  const status = config.enabled ? `✓ ${config.level}` : '○ OFF';
  const namespaces = manager.getNamespaces();
  const nsStr = namespaces.length > 0 ? `\n  Active namespaces: ${namespaces.join(', ')}` : '';

  console.log(
    `%c╔════════════════════════════════════════╗
║  DevKit Console v${config.version.padEnd(30)}  ║
║  Status: ${status.padEnd(33)}║${nsStr ? `\n║${nsStr.padEnd(40)}║` : ''}
╚════════════════════════════════════════╝`,
    'color: #3b82f6; font-family: monospace; font-size: 12px;'
  );
}
