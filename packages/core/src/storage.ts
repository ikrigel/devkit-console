import type { StorageAdapter } from './types';

/**
 * Default storage adapter using window.localStorage
 */
export const defaultStorageAdapter: StorageAdapter = {
  getItem(key: string) {
    try {
      return typeof window !== 'undefined' ? window.localStorage?.getItem(key) ?? null : null;
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Silently fail (quota exceeded, privacy mode, etc)
    }
  },
  removeItem(key: string) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Silently fail
    }
  },
};

/**
 * No-op storage adapter for SSR/testing
 */
export const noopStorageAdapter: StorageAdapter = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};
