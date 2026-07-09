import type { LogEntry, LogLevel } from './types';

/**
 * Ring buffer for log history
 */
export class LogHistory {
  private entries: LogEntry[] = [];
  private maxSize: number;

  constructor(maxSize: number = 500) {
    this.maxSize = Math.max(1, maxSize);
  }

  add(entry: LogEntry): void {
    this.entries.push(entry);
    if (this.entries.length > this.maxSize) {
      this.entries.shift();
    }
  }

  getAll(): readonly LogEntry[] {
    return Object.freeze([...this.entries]);
  }

  filter(predicate: (entry: LogEntry) => boolean): LogEntry[] {
    return this.entries.filter(predicate);
  }

  clear(): void {
    this.entries = [];
  }

  exportJSON(): string {
    return JSON.stringify(this.entries, null, 2);
  }

  exportText(): string {
    return this.entries
      .map(
        e =>
          `[${e.isoTime}] ${e.level.padEnd(5)} [${e.namespace}] ${e.message}${e.data ? ` ${JSON.stringify(e.data)}` : ''}`
      )
      .join('\n');
  }

  size(): number {
    return this.entries.length;
  }
}
