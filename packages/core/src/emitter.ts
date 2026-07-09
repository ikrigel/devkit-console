/**
 * Generic typed event emitter
 */
export class TypedEmitter<T> {
  private listeners: Set<(event: T) => void> = new Set();

  on(listener: (event: T) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  once(listener: (event: T) => void): () => void {
    const unsubscribe = this.on((event: T) => {
      listener(event);
      unsubscribe();
    });
    return unsubscribe;
  }

  emit(event: T): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (error) {
        console.error('[DevKit] Listener error:', error);
      }
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}
