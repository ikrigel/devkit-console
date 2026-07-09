# DevKit Console — Debug Your React App Like a Boss

**TL;DR:** Zero-dep npm library that makes browser console and React UI talk to each other in real-time. Change log levels from DevTools or a floating panel—both sync instantly. Full TypeScript. Drop-in React components. No CSS imports. [Live demo](https://devkit-console.vercel.app) | [GitHub](https://github.com/ikrigel/devkit-console)

---

## The Problem

You're debugging a React app. You open DevTools and type `debug.debug()` to change the log level. But your React UI? Still showing the old level. Your logger UI component didn't update. You have to manually trigger a state change or reload.

Or worse: your logger UI is only connected to *some* parts of your app. The console API isn't synced. The history stored in React state doesn't match what's in localStorage.

## The Solution

**DevKit Console** is a 10KB (gzipped) npm library that makes your browser console and React UI **genuinely bidirectional**:

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

## What's Included

### @devkit-console/core
- **DebugManager** — centralized log state (enabled/disabled, level)
- **Logger** — namespace-scoped loggers (`debug.ns('MyApp')`)
- **Storage** — auto-persist to localStorage + log history
- **window.debug API** — everything from your browser console
- **TypeScript** — full type safety

Zero runtime dependencies. ~3KB gzipped.

### @devkit-console/react
- **Hooks** — `useDebugConfig()`, `useLogHistory()`, `useLogger()`
- **6 Drop-In Components**
  - `<StatusBadge />` — "● DEBUG" or "○ OFF"
  - `<LevelSelector />` — 5-button pill group for levels
  - `<LogViewer />` — colored scrollable log history
  - `<ExportButton />` — download logs as JSON/text
  - `<NamespaceList />` — active namespaces + counts
  - `<DebugPanel />` — floating panel composing all above
- **No CSS imports** — everything styled inline
- **Uncontrolled & controlled** — use `defaultOpen` or `open` + `onOpenChange`

~8KB gzipped.

---

## Quick Example

```typescript
import React from 'react';
import { DebugKitProvider, DebugPanel, useDebugConfig } from '@devkit-console/react';

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

---

## Browser Console Magic

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

## Why This Slaps

✅ **Bidirectional sync** — console and UI are always in sync  
✅ **Namespace support** — scoped loggers (`debug.ns('Network')`)  
✅ **Structured data** — log objects + arrays, not just strings  
✅ **Export logs** — download as JSON or text  
✅ **TypeScript** — full type safety, no `any`  
✅ **Zero dependencies** (core package)  
✅ **No CSS** — drop-in React components with inline styles  
✅ **Tiny** — 3KB core + 8KB react (gzipped)  
✅ **Persistent** — settings saved to localStorage  
✅ **Event-based** — pub/sub under the hood, not polling  

---

## Installation

```bash
npm install @devkit-console/core @devkit-console/react
```

Or just core if you only want the manager + console API:

```bash
npm install @devkit-console/core
```

---

## Live Demo

Check out the interactive demo: https://devkit-console.vercel.app

- Open browser console (F12)
- Type `debug.debug()` to change level
- Watch the panel UI update in real-time
- Click level buttons in the UI
- Watch console banner reflect the change

---

## Docs

- **README** — https://github.com/ikrigel/devkit-console/blob/main/docs/README.md
- **Full API** — https://github.com/ikrigel/devkit-console/blob/main/docs/API.md
- **Changelog** — https://github.com/ikrigel/devkit-console/blob/main/docs/CHANGELOG.md

---

## GitHub

https://github.com/ikrigel/devkit-console

⭐ If you like it, drop a star!

---

**What's your logging setup like?** Drop a comment if you've dealt with the console↔UI sync problem before. Curious what people are doing today.
