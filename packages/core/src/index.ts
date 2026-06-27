// Types
export type {
  LogLevel,
  LogEntry,
  DebugConfig,
  DebugConfigChangeEvent,
  LogHistoryChangeEvent,
  StorageAdapter,
} from './types';
export { LOG_LEVEL_RANK } from './types';

// Core classes
export { DebugManager, getDebugManager, createDebugManager } from './manager';
export { Logger } from './logger';
export { TypedEmitter } from './emitter';
export { LogHistory } from './history';

// Storage
export { defaultStorageAdapter, noopStorageAdapter } from './storage';

// Window global
export { installWindowGlobal, uninstallWindowGlobal } from './window-global';
export type { DebugGlobal } from './window-global';

// Constants
export { STORAGE_KEY_PREFIX, DEFAULT_MAX_HISTORY_SIZE, VERSION } from './constants';

// Convenience export
import { getDebugManager, installWindowGlobal } from './window-global';

// Auto-install to window.debug if available
if (typeof window !== 'undefined') {
  installWindowGlobal(getDebugManager());
}
