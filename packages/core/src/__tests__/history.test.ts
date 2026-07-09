import { describe, it, expect, beforeEach } from 'vitest';
import { LogHistory } from '../history';
import type { LogEntry } from '../types';

describe('LogHistory', () => {
  let history: LogHistory;

  beforeEach(() => {
    history = new LogHistory(5);
  });

  it('should add entries', () => {
    const entry: LogEntry = {
      id: '1',
      timestamp: Date.now(),
      isoTime: new Date().toISOString(),
      level: 'INFO',
      namespace: 'Test',
      message: 'Hello',
    };

    history.add(entry);

    expect(history.getAll()).toHaveLength(1);
    expect(history.getAll()[0]).toEqual(entry);
  });

  it('should enforce max size (ring buffer)', () => {
    const history = new LogHistory(3);

    for (let i = 0; i < 5; i++) {
      history.add({
        id: `${i}`,
        timestamp: Date.now(),
        isoTime: new Date().toISOString(),
        level: 'INFO',
        namespace: 'Test',
        message: `Message ${i}`,
      });
    }

    const entries = history.getAll();
    expect(entries).toHaveLength(3);
    expect(entries[0].message).toBe('Message 2');
    expect(entries[2].message).toBe('Message 4');
  });

  it('should filter entries', () => {
    for (let i = 0; i < 3; i++) {
      history.add({
        id: `${i}`,
        timestamp: Date.now(),
        isoTime: new Date().toISOString(),
        level: i === 1 ? 'ERROR' : 'INFO',
        namespace: 'Test',
        message: `Message ${i}`,
      });
    }

    const errors = history.filter(e => e.level === 'ERROR');
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe('Message 1');
  });

  it('should clear entries', () => {
    history.add({
      id: '1',
      timestamp: Date.now(),
      isoTime: new Date().toISOString(),
      level: 'INFO',
      namespace: 'Test',
      message: 'Hello',
    });

    expect(history.getAll()).toHaveLength(1);
    history.clear();
    expect(history.getAll()).toHaveLength(0);
  });

  it('should export as JSON', () => {
    history.add({
      id: '1',
      timestamp: Date.now(),
      isoTime: '2026-06-27T12:00:00Z',
      level: 'INFO',
      namespace: 'Test',
      message: 'Hello',
    });

    const json = history.exportJSON();
    const parsed = JSON.parse(json);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].message).toBe('Hello');
  });

  it('should export as text', () => {
    history.add({
      id: '1',
      timestamp: Date.now(),
      isoTime: '2026-06-27T12:00:00Z',
      level: 'INFO',
      namespace: 'Test',
      message: 'Hello',
    });

    const text = history.exportText();

    expect(text).toContain('[Test]');
    expect(text).toContain('Hello');
    expect(text).toContain('INFO');
  });

  it('should return size', () => {
    history.add({
      id: '1',
      timestamp: Date.now(),
      isoTime: new Date().toISOString(),
      level: 'INFO',
      namespace: 'Test',
      message: 'Hello',
    });

    expect(history.size()).toBe(1);
  });
});
