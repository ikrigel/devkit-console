import type { LogLevel } from './types';
import { LOG_LEVEL_RANK } from './types';
import type { DebugManager } from './manager';

/**
 * Namespace-scoped logger
 */
export class Logger {
  constructor(
    private namespace: string,
    private manager: DebugManager
  ) {}

  private shouldLog(level: LogLevel): boolean {
    const config = this.manager.getConfig();
    if (!config.enabled) return false;
    return LOG_LEVEL_RANK[level] <= LOG_LEVEL_RANK[config.level];
  }

  trace(message: string, data?: unknown): void {
    if (this.shouldLog('TRACE')) {
      this.manager.log(this.namespace, 'TRACE', message, data);
    }
  }

  debug(message: string, data?: unknown): void {
    if (this.shouldLog('DEBUG')) {
      this.manager.log(this.namespace, 'DEBUG', message, data);
    }
  }

  info(message: string, data?: unknown): void {
    if (this.shouldLog('INFO')) {
      this.manager.log(this.namespace, 'INFO', message, data);
    }
  }

  warn(message: string, data?: unknown): void {
    if (this.shouldLog('WARN')) {
      this.manager.log(this.namespace, 'WARN', message, data);
    }
  }

  error(message: string, data?: unknown): void {
    if (this.shouldLog('ERROR')) {
      this.manager.log(this.namespace, 'ERROR', message, data);
    }
  }

  getNamespace(): string {
    return this.namespace;
  }
}
