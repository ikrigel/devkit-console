import { describe, it, expect, beforeEach } from 'vitest';
import { DebugManager } from '../manager';
import { noopStorageAdapter } from '../storage';

describe('Logger (via DebugManager.ns)', () => {
  let manager: DebugManager;

  beforeEach(() => {
    manager = new DebugManager(noopStorageAdapter, 'DEBUG');
  });

  it('should log at correct levels', () => {
    const logger = manager.ns('Test');
    const logs: any[] = [];

    manager.onLogChange(event => {
      logs.push(event.latest);
    });

    logger.error('Error message');
    logger.warn('Warn message');
    logger.info('Info message');
    logger.debug('Debug message');
    logger.trace('Trace message');

    expect(logs).toHaveLength(4); // TRACE filtered out (level is DEBUG)
    expect(logs[0].level).toBe('ERROR');
    expect(logs[3].level).toBe('DEBUG');
  });

  it('should respect log level threshold', () => {
    manager.setLevel('WARN', 'api');
    const logger = manager.ns('Test');
    const logs: any[] = [];

    manager.onLogChange(event => {
      logs.push(event.latest);
    });

    logger.info('Info');
    logger.warn('Warn');
    logger.error('Error');

    expect(logs).toHaveLength(2); // INFO filtered out
    expect(logs[0].level).toBe('WARN');
    expect(logs[1].level).toBe('ERROR');
  });

  it('should include data in log entry', () => {
    const logger = manager.ns('Test');
    const logs: any[] = [];

    manager.onLogChange(event => {
      logs.push(event.latest);
    });

    logger.info('Request', { url: '/api/users', status: 200 });

    expect(logs[0].data).toEqual({ url: '/api/users', status: 200 });
  });

  it('should namespace logs correctly', () => {
    const authLogger = manager.ns('Auth');
    const networkLogger = manager.ns('Network');
    const logs: any[] = [];

    manager.onLogChange(event => {
      logs.push(event.latest);
    });

    authLogger.info('Login attempt');
    networkLogger.info('Request sent');

    expect(logs[0].namespace).toBe('Auth');
    expect(logs[1].namespace).toBe('Network');
  });

  it('should respect disabled state', () => {
    manager.disable();
    const logger = manager.ns('Test');
    const logs: any[] = [];

    manager.onLogChange(event => {
      logs.push(event.latest);
    });

    logger.info('Message');

    expect(logs).toHaveLength(0);
  });
});
