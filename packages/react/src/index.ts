// Context & Provider
export { DebugKitProvider, DebugKitContext } from './context';
export type { DebugKitContextType, DebugKitProviderProps } from './context';

// Hooks
export { useDebugConfig } from './hooks/useDebugConfig';
export { useLogHistory } from './hooks/useLogHistory';
export type { LogHistoryFilters } from './hooks/useLogHistory';
export { useLogger } from './hooks/useLogger';

// Re-export core types for convenience
export type { DebugConfig, LogEntry, LogLevel } from '@devkit-console/core';

// Components will be exported as they're created
