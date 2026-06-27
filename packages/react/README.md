# @devkit-console/react

React hooks and components for DevKit Console UI integration.

## Install

```bash
npm install @devkit-console/core @devkit-console/react
```

## Quick Start

```tsx
import { DebugPanel } from '@devkit-console/react';

export function App() {
  return (
    <>
      <YourApp />
      <DebugPanel position="bottom-right" />
    </>
  );
}
```

## Components

- **`<DebugPanel>`** — Floating debug panel with full UI
- **`<LevelSelector>`** — 5-pill level selector
- **`<LogViewer>`** — Scrollable log list with filters
- **`<StatusBadge>`** — Small status indicator

## Hooks

- **`useDebugConfig()`** — Current config, re-renders on changes
- **`useLogHistory(filters?)`** — Filtered logs, real-time updates
- **`useLogger(namespace)`** — Memoized namespace logger

See [`docs/API.md`](../../docs/API.md) for complete reference.
