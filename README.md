# DevKit Console

**Real-time bidirectional debug level control between browser console and React UI.**

[![npm version](https://img.shields.io/npm/v/@devkit-console/core)](https://www.npmjs.com/package/@devkit-console/core)
[![npm version](https://img.shields.io/npm/v/@devkit-console/react)](https://www.npmjs.com/package/@devkit-console/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## The Problem

You're debugging a React app. You type `debug.debug()` in DevTools to change the log level. But your React UI doesn't update. You have to manually trigger a state change or reload the page.

Or worse: your logger UI is disconnected from the console API. The history in React state doesn't match localStorage. Everything is out of sync.

## The Solution

**DevKit Console** makes your browser console and React UI **genuinely bidirectional**:

```javascript
// From browser console (F12):
debug.debug()        // ← Change log level
```

```javascript
// Your React UI updates instantly:
const config = useDebugConfig();  // Re-renders with new level
```

No polling. No setTimeout. Real pub/sub events under the hood.

---

## Quick Start

### Installation

```bash
npm install devkit-console-core devkit-console-ui
```

Or just core if you only need the console API:

```bash
npm install devkit-console-core
```

### Usage

**React App:**

```typescript
import React from 'react';
import { DebugKitProvider, DebugPanel, useDebugConfig } from 'devkit-console-ui';

function App() {
  return (
    <DebugKitProvider>
      <YourApp />
      
      {/* Floating debug panel — click 🐛 to open */}
      <DebugPanel
        position="bottom-right"
        defaultOpen={false}
        showLogViewer={true}
        showExport={true}
        showVersion={true}
      />
    </DebugKitProvider>
  );
}

function MyComponent() {
  const config = useDebugConfig();  // Subscribes to config changes
  const logger = useLogger('MyComponent');

  return (
    <div>
      Debug is {config.enabled ? '🟢 ON' : '🔴 OFF'} at {config.level}
      <button onClick={() => logger.info('Button clicked!')}>
        Click me
      </button>
    </div>
  );
}
```

### Browser Console Magic

```javascript
// From console (F12), no setup needed:

debug.debug()        // Set level to DEBUG (shows debug logs)
debug.trace()        // Set level to TRACE (most verbose)
debug.info()         // Set level to INFO
debug.warn()         // Set level to WARN
debug.error()        // Set level to ERROR
debug.disable()      // Turn off logging entirely

debug.status()       // Show ASCII banner with current status
debug.version()      // Show version
debug.history()      // Get array of all logged entries
debug.exportLogs('json') // Download as JSON
debug.ns('Auth').info('Login') // Scoped logging

// Your React UI updates in real-time 👆
```

---

## What's Included

### devkit-console-core (~3KB gzipped)

- **DebugManager** — centralized log state (enabled/disabled, level)
- **Logger** — namespace-scoped loggers (`debug.ns('MyApp')`)
- **Storage** — auto-persist to localStorage + log history
- **window.debug API** — everything from your browser console
- **TypeScript** — full type safety
- **Zero dependencies** at runtime

### devkit-console-ui (~8KB gzipped)

**Hooks:**
- `useDebugConfig()` — subscribe to config changes
- `useLogHistory(filters?)` — subscribe to log changes
- `useLogger(namespace)` — get namespaced logger for component

**6 Drop-In Components:**
- `<StatusBadge />` — "● DEBUG" or "○ OFF"
- `<LevelSelector />` — 5-button pill group for levels
- `<LogViewer />` — colored scrollable log history
- `<ExportButton />` — download logs as JSON/text
- `<NamespaceList />` — active namespaces + counts
- `<DebugPanel />` — floating panel composing all above

**Features:**
- Inline styles only (no CSS imports)
- Controlled & uncontrolled patterns
- Dark/light theme support
- 4 position variants for floating panel

---

## Live Demo

Check out the interactive demo: https://devkit-console.vercel.app

- Open browser console (F12)
- Type `debug.debug()` to change level
- Watch the panel UI update in real-time
- Click level buttons in the UI
- Watch console banner reflect the change

---

## Key Features

✅ **Bidirectional sync** — console and UI always in sync  
✅ **Namespace support** — scoped loggers (`debug.ns('Network')`)  
✅ **Structured data** — log objects + arrays, not just strings  
✅ **Export logs** — download as JSON or text  
✅ **TypeScript** — full type safety, no `any`  
✅ **Zero dependencies** (devkit-console-core)  
✅ **No CSS imports** — drop-in React components with inline styles  
✅ **Tiny** — 3KB core + 8KB UI (gzipped)  
✅ **Persistent** — settings saved to localStorage  
✅ **Event-based** — pub/sub under the hood, not polling  

---

## Documentation

- **[Getting Started](./docs/README.md)** — Installation + common patterns
- **[Full API Reference](./docs/API.md)** — Complete API docs for core & react
- **[Changelog](./docs/CHANGELOG.md)** — Release notes & roadmap

---

## Architecture

### Monorepo Structure

```
devkit-console/
├── packages/
│   ├── core/          → @devkit-console/core (manager + console API)
│   └── react/         → @devkit-console/react (hooks + components)
├── apps/
│   └── demo/          → Interactive demo (Vite + React)
└── docs/
    ├── README.md      → Getting started
    ├── API.md         → Full API reference
    └── CHANGELOG.md   → Release notes
```

### Core Concepts

**DebugManager** is the single source of truth:
- Owns log level state
- Emits config changes via TypedEmitter
- Persists to localStorage
- Exposes window.debug API

**React components subscribe** to manager via context:
- `<DebugKitProvider>` wraps your app
- Hooks call `useDebugConfig()` / `useLogHistory()`
- Re-renders happen automatically on changes

**No polling, no setTimeout** — everything is event-driven.

---

## Examples

### Example 1: Basic Setup

```typescript
import { DebugKitProvider, DebugPanel } from '@devkit-console/react';

export function App() {
  return (
    <DebugKitProvider>
      <YourApp />
      <DebugPanel position="bottom-right" defaultOpen={false} />
    </DebugKitProvider>
  );
}
```

### Example 2: Custom Hook Usage

```typescript
function MyComponent() {
  const config = useDebugConfig();
  const logger = useLogger('MyComponent');
  const history = useLogHistory({ level: 'WARN' });

  return (
    <div>
      <p>Current level: {config.level}</p>
      <p>Recent warnings: {history.length}</p>
      <button onClick={() => logger.warn('Warning!')}>Log Warning</button>
    </div>
  );
}
```

### Example 3: Namespace Logging

```typescript
// In any component or utility:
const authLogger = useLogger('Auth');
const apiLogger = useLogger('API');
const renderLogger = useLogger('Render');

authLogger.info('User logged in');
apiLogger.error('Request failed');
renderLogger.debug('Component rendered');

// In console, filter by namespace:
debug.ns('Auth').info('Event from Auth namespace');
```

---

## Testing

The project includes comprehensive tests:

- **30 tests** for devkit-console-core
- **3 tests** for devkit-console-ui components
- **Zero external dependencies** (core)
- **Full TypeScript** strict mode

Run tests locally:

```bash
pnpm install
pnpm -r test:run
```

---

## Performance

- **Build sizes** (gzipped):
  - devkit-console-core: ~3KB
  - devkit-console-ui: ~8KB
  - demo: ~52KB (full app with all dependencies)

- **Runtime performance**:
  - Log history: in-memory ring buffer (default 500 entries)
  - Pub/sub events: synchronous, no async overhead
  - React re-renders: only when config or history changes

---

## Browser Support

- All modern browsers with ES2020 + localStorage support
- Chrome/Edge/Firefox/Safari (latest 2 versions)
- Mobile browsers supported

---

## Contributing

Issues and PRs welcome at [GitHub](https://github.com/ikrigel/devkit-console).

---

## License

MIT — See LICENSE file in repository root.

---

## Roadmap

### v0.2.0 (Planned)
- Cloud persistence (Firebase/Supabase)
- Remote log aggregation
- Advanced filtering in LogViewer

### v0.3.0 (Planned)
- Plugin system
- Log streams
- Performance profiling integration

### v1.0.0 (Planned)
- Stable API guarantee
- Advanced analytics
- Enterprise features

---

**What's your logging setup like?** [Open an issue](https://github.com/ikrigel/devkit-console/issues) or [start a discussion](https://github.com/ikrigel/devkit-console/discussions) if you've dealt with the console↔UI sync problem before!
