// Context & Provider
export { DebugKitProvider, DebugKitContext } from './context';
export type { DebugKitContextType, DebugKitProviderProps } from './context';

// Hooks
export { useDebugConfig } from './hooks/useDebugConfig';
export { useLogHistory } from './hooks/useLogHistory';
export type { LogHistoryFilters } from './hooks/useLogHistory';
export { useLogger } from './hooks/useLogger';
export { useDebugManager } from './hooks/useDebugManager';

// Components
export { StatusBadge } from './components/StatusBadge';
export type { StatusBadgeProps } from './components/StatusBadge';

export { LevelSelector } from './components/LevelSelector';
export type { LevelSelectorProps } from './components/LevelSelector';

export { LogViewer } from './components/LogViewer';
export type { LogViewerProps } from './components/LogViewer';

export { ExportButton } from './components/ExportButton';
export type { ExportButtonProps } from './components/ExportButton';

export { NamespaceList } from './components/NamespaceList';
export type { NamespaceListProps } from './components/NamespaceList';

export { DebugPanel } from './components/DebugPanel';
export type { DebugPanelProps } from './components/DebugPanel';

// Re-export core types for convenience
export type { DebugConfig, LogEntry, LogLevel } from 'devkit-console-core';
