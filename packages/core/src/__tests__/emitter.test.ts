import { describe, it, expect } from 'vitest';
import { TypedEmitter } from '../emitter';

interface TestEvent {
  message: string;
  value: number;
}

describe('TypedEmitter', () => {
  it('should add and call listeners', () => {
    const emitter = new TypedEmitter<TestEvent>();
    const events: TestEvent[] = [];

    emitter.on(event => {
      events.push(event);
    });

    emitter.emit({ message: 'test', value: 1 });

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ message: 'test', value: 1 });
  });

  it('should unsubscribe listener', () => {
    const emitter = new TypedEmitter<TestEvent>();
    const events: TestEvent[] = [];

    const unsubscribe = emitter.on(event => {
      events.push(event);
    });

    emitter.emit({ message: 'test1', value: 1 });
    unsubscribe();
    emitter.emit({ message: 'test2', value: 2 });

    expect(events).toHaveLength(1);
    expect(events[0].message).toBe('test1');
  });

  it('should support once listener', () => {
    const emitter = new TypedEmitter<TestEvent>();
    const events: TestEvent[] = [];

    emitter.once(event => {
      events.push(event);
    });

    emitter.emit({ message: 'test1', value: 1 });
    emitter.emit({ message: 'test2', value: 2 });

    expect(events).toHaveLength(1);
  });

  it('should handle multiple listeners', () => {
    const emitter = new TypedEmitter<TestEvent>();
    const events1: TestEvent[] = [];
    const events2: TestEvent[] = [];

    emitter.on(event => events1.push(event));
    emitter.on(event => events2.push(event));

    emitter.emit({ message: 'test', value: 1 });

    expect(events1).toHaveLength(1);
    expect(events2).toHaveLength(1);
  });

  it('should clear all listeners', () => {
    const emitter = new TypedEmitter<TestEvent>();
    const events: TestEvent[] = [];

    emitter.on(event => events.push(event));
    emitter.clear();
    emitter.emit({ message: 'test', value: 1 });

    expect(events).toHaveLength(0);
  });

  it('should handle listener errors gracefully', () => {
    const emitter = new TypedEmitter<TestEvent>();
    const spyErr = console.error as any;
    console.error = () => {};

    let errorThrown = false;
    emitter.on(() => {
      throw new Error('listener error');
    });
    emitter.on(() => {
      errorThrown = true;
    });

    emitter.emit({ message: 'test', value: 1 });

    // Second listener should still run
    expect(errorThrown).toBe(true);
    console.error = spyErr;
  });
});
