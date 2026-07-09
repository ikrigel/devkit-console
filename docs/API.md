# API Reference

## @devkit-console/core

### DebugManager

Central class managing debug configuration, log history, and event emission.

#### Static Methods

```typescript
getDebugManager(): DebugManager
// Returns singleton instance (auto-created on first call)

createDebugManager(
  storage?: StorageAdapter,
  initialLevel?: LogLevel
): DebugManager
// Create a new instance with optional custom storage
```

#### Instance Methods

```typescript
setLevel(level: LogLevel, source?: 'console' | 'ui' | 'api'): void
// Change log level. Source indicates where change came from.

enable(source?: 'console' | 'ui' | 'api'): void
// Enable logging

disable(source?: 'console' | 'ui' | 'api'): void
// Disable logging (nothing logged, but config persists)

getConfig(): Readonly<DebugConfig>
// Get current configuration (frozen object)

ns(namespace: string): Logger
// Get or create a namespaced logger

getNamespaces(): string[]
// List all active namespaces

log(namespace: string, level: LogLevel, message: string, data?: unknown): void
// Log entry (respects log level filtering)

getHistory(): readonly LogEntry[]
// Get all logged entries

clearHistory(): void
// Clear all logs from history

exportLogs(format: 'json' | 'text'): string
// Export logs as JSON or formatted text

onConfigChange(listener: (event: DebugConfigChangeEvent) => void): () => void
// Subscribe to config changes. Returns unsubscribe function.

onLogChange(listener: (event: LogHistoryChangeEvent) => void): () => void
// Subscribe to log history changes. Returns unsubscribe function.
```

### Logger

Namespace-scoped logger instance.

```typescript
class Logger {
  trace(message: string, data?: unknown): void
  debug(message: string, data?: unknown): void
  info(message: string, data?: unknown): void
  warn(message: string, data?: unknown): void
  error(message: string, data?: unknown): void
}
```

All methods respect the manager's configured log level and only log if the entry's level meets the threshold.

### Types

```typescript
type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE';

interface LogEntry {
  id: string;
  timestamp: number;
  isoTime: string;
  level: LogLevel;
  namespace: string;
  message: string;
  data?: unknown;
}

interface DebugConfig {
  enabled: boolean;
  level: LogLevel;
  prefix: string;
  version: string;
  maxHistorySize: number;
}

interface DebugConfigChangeEvent {
  config: Readonly<DebugConfig>;
  changedBy: 'console' | 'ui' | 'api';
}

interface DebugHistoryChangeEvent {
  entries: ReadonlyArray<LogEntry>;
  latest: LogEntry;
}

interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
```

### Storage Adapters

```typescript
// Default: uses window.localStorage with safe error handling
defaultStorageAdapter: StorageAdapter

// No-op adapter: disables persistence
noopStorageAdapter: StorageAdapter
```

### Window Global API

Auto-installed as `window.debug` when the page has a `window` object:

```typescript
interface DebugGlobal {
  trace(): void;
  debug(): void;
  info(): void;
  warn(): void;
  error(): void;
  all(): void;              // Alias for trace()
  disable(): void;
  enable(): void;
  setLevel(level: LogLevel): void;
  status(): void;           // Print ASCII banner to console
  version(): void;          // Print version info
  ns(namespace: string): Logger;
  history(): readonly LogEntry[];
  exportLogs(format: 'json' | 'text'): string;
  clearHistory(): void;
  getConfig(): DebugConfig;
  _manager?: DebugManager;  // Internal reference (debug only)
}
```

---

## @devkit-console/react

### DebugKitProvider

Context provider that wraps your app. Required for all hooks and components.

```typescript
interface DebugKitProviderProps {
  children: ReactNode;
  manager?: DebugManager;  // Optional: custom manager instance
}

function DebugKitProvider({ children, manager }: DebugKitProviderProps)
```

**Usage:**
```typescript
<DebugKitProvider>
  <App />
</DebugKitProvider>
```

### Hooks

#### useDebugConfig()

Returns current debug configuration and subscribes to changes.

```typescript
function useDebugConfig(): DebugConfig

// Example
const config = useDebugConfig();
console.log(config.enabled, config.level);
```

#### useLogHistory(filters?)

Returns filtered log entries and subscribes to log changes.

```typescript
interface LogHistoryFilters {
  namespace?: string;      // Filter by namespace
  levels?: LogLevel[];     // Filter by one or more levels
  limit?: number;          // Show only last N entries
}

function useLogHistory(filters?: LogHistoryFilters): readonly LogEntry[]

// Examples
const allLogs = useLogHistory();
const errorLogs = useLogHistory({ levels: ['ERROR', 'WARN'] });
const appLogs = useLogHistory({ namespace: 'App' });
const recent50 = useLogHistory({ limit: 50 });
```

#### useLogger(namespace)

Returns a scoped logger instance for the namespace.

```typescript
function useLogger(namespace: string): Logger

// Example
const logger = useLogger('MyComponent');
logger.info('Component mounted');
```

### Components

#### StatusBadge

Shows current debug status (enabled/disabled + level).

```typescript
interface StatusBadgeProps {
  className?: string;
}

function StatusBadge({ className }: StatusBadgeProps)

// Displays: "● DEBUG" or "○ OFF"
```

#### LevelSelector

Five-button group for selecting log level.

```typescript
interface LevelSelectorProps {
  className?: string;
}

function LevelSelector({ className }: LevelSelectorProps)

// Displays: [ERROR] [WARN] [INFO] [DEBUG] [TRACE]
// Active button has colored border
```

#### LogViewer

Scrollable log history with color-coding by level.

```typescript
interface LogViewerProps {
  namespace?: string;      // Filter by namespace
  levels?: LogLevel[];     // Filter by levels
  maxVisibleLogs?: number; // Max entries to show (default 100)
  className?: string;
}

function LogViewer(props: LogViewerProps)

// Displays logs with:
// - Level color (red=ERROR, yellow=WARN, blue=INFO, purple=DEBUG, gray=TRACE)
// - Namespace prefix
// - Message
// - Structured data (if present)
```

#### ExportButton

Download logs as JSON or text file.

```typescript
interface ExportButtonProps {
  format?: 'json' | 'text'; // Default: 'json'
  className?: string;
}

function ExportButton({ format, className }: ExportButtonProps)

// File name: debug-logs-YYYY-MM-DD-HH-mm-ss.{json|txt}
```

#### NamespaceList

Shows active namespaces and their log entry counts.

```typescript
interface NamespaceListProps {
  className?: string;
}

function NamespaceList({ className }: NamespaceListProps)

// Displays:
// Namespaces
// MyApp: 42
// Network: 15
// Auth: 8
```

#### DebugPanel

Floating panel composing all above components.

```typescript
interface DebugPanelProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  defaultOpen?: boolean;   // Default: true
  open?: boolean;          // Controlled mode
  onOpenChange?: (open: boolean) => void;
  showLogViewer?: boolean; // Default: true
  showExport?: boolean;    // Default: true
  showNamespaces?: boolean; // Default: true
  showVersion?: boolean;   // Default: false
  maxVisibleLogs?: number; // Default: 100
  theme?: 'dark' | 'light' | 'auto'; // Default: 'light'
  className?: string;
}

function DebugPanel(props: DebugPanelProps)

// Features:
// - Floating/fixed positioning with 4 position options
// - Toggle button when closed (🐛 emoji)
// - All components composed inside
// - Smooth open/close animation
// - Inline styles only (no CSS imports)
```

**Controlled Example:**
```typescript
const [open, setOpen] = useState(false);

<DebugPanel
  open={open}
  onOpenChange={setOpen}
  position="bottom-left"
/>
```

**Uncontrolled Example:**
```typescript
<DebugPanel
  position="bottom-right"
  defaultOpen={false}
/>
```

---

## Re-Exports from @devkit-console/react

For convenience, types from core are re-exported:

```typescript
export type { DebugConfig, LogEntry, LogLevel } from '@devkit-console/core';
```

So you can import them from either package:

```typescript
import type { LogLevel } from '@devkit-console/react';
// or
import type { LogLevel } from '@devkit-console/core';
```

---

## Version

- **Current:** 0.1.0
- **Release Date:** 2026-07-09
