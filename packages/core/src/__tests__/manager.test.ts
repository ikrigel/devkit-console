import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DebugManager } from '../manager';
import { noopStorageAdapter } from '../storage';

describe('DebugManager', () => {
  let manager: DebugManager;

  beforeEach(() => {
    manager = new DebugManager(noopStorageAdapter, 'INFO');
  });

  it('should initialize with default config', () => {
    const config = manager.getConfig();
    expect(config.enabled).toBe(true);
    expect(config.level).toBe('INFO');
    expect(config.prefix).toBe('@devkit-console');
  });

  it('should change log level', () => {
    manager.setLevel('DEBUG', 'api');
    const config = manager.getConfig();
    expect(config.level).toBe('DEBUG');
  });

  it('should emit config change event', () => {
    const changes: any[] = [];
    manager.onConfigChange(event => {
      changes.push(event);
    });

    manager.setLevel('DEBUG', 'console');

    expect(changes).toHaveLength(1);
    expect(changes[0].changedBy).toBe('console');
    expect(changes[0].config.level).toBe('DEBUG');
  });

  it('should enable and disable logging', () => {
    manager.disable();
    expect(manager.getConfig().enabled).toBe(false);

    manager.enable();
    expect(manager.getConfig().enabled).toBe(true);
  });

  it('should create namespace loggers', () => {
    const logger1 = manager.ns('Auth');
    const logger2 = manager.ns('Auth');

    // Should return same instance for same namespace
    expect(logger1).toBe(logger2);
  });

  it('should track namespaces', () => {
    manager.ns('Auth');
    manager.ns('Network');
    manager.ns('Render');

    const namespaces = manager.getNamespaces();
    expect(namespaces).toContain('Auth');
    expect(namespaces).toContain('Network');
    expect(namespaces).toContain('Render');
  });

  it('should log to history', () => {
    const changes: any[] = [];
    manager.onLogChange(event => {
      changes.push(event);
    });

    manager.log('Test', 'INFO', 'Hello world');

    expect(changes).toHaveLength(1);
    expect(changes[0].latest.namespace).toBe('Test');
    expect(changes[0].latest.message).toBe('Hello world');
    expect(changes[0].latest.level).toBe('INFO');
  });

  it('should filter logs by level', () => {
    const changes: any[] = [];
    manager.onLogChange(() => {
      changes.push(true);
    });

    manager.setLevel('WARN', 'api');
    manager.log('Test', 'DEBUG', 'Debug message'); // Should not log
    manager.log('Test', 'WARN', 'Warn message'); // Should log

    expect(changes).toHaveLength(1);
  });

  it('should export logs as JSON', () => {
    manager.log('Test', 'INFO', 'Message 1');
    manager.log('Test', 'INFO', 'Message 2');

    const json = manager.exportLogs('json');
    const parsed = JSON.parse(json);

    expect(parsed).toHaveLength(2);
    expect(parsed[0].message).toBe('Message 1');
    expect(parsed[1].message).toBe('Message 2');
  });

  it('should export logs as text', () => {
    manager.log('Test', 'INFO', 'Message 1');

    const text = manager.exportLogs('text');

    expect(text).toContain('[Test]');
    expect(text).toContain('Message 1');
    expect(text).toContain('INFO');
  });

  it('should clear history', () => {
    manager.log('Test', 'INFO', 'Message');
    expect(manager.getHistory()).toHaveLength(1);

    manager.clearHistory();
    expect(manager.getHistory()).toHaveLength(0);
  });

  it('should respect disabled state', () => {
    const changes: any[] = [];
    manager.onLogChange(() => changes.push(true));

    manager.disable();
    manager.log('Test', 'INFO', 'Message');

    expect(changes).toHaveLength(0);
  });
});
