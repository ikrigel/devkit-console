# DevKit Console – Debug Like Waze, Not Like Vim

**TL;DR:** Zero-dependency npm library for bidirectional debug level control between browser console and React UI. Type `debug.trace()` in DevTools → UI updates instantly. Try it live: https://devkit-console.vercel.app

---

## The Problem

You're deep in a debugging session. You want to see everything (`trace` level). So you:

1. Open DevTools
2. Type `debug.trace()`
3. **Squint at console output while wrestling with your app's UI**
4. Miss critical state changes because logs scroll past
5. Can't filter by namespace or export for analysis
6. Repeat 50 times

Or you click a UI button to change log levels, but DevTools doesn't know about it. Debugging feels *fragmented*.

---

## The Solution

**DevKit Console** bridges that gap. It's like having Waze (intuitive UI) instead of reading GPS coordinates (raw console logs).

### The Core Trick: Bidirectional Sync

```javascript
// Open browser console and type (no parentheses):
debug.trace    // Enable TRACE level - UI updates INSTANTLY
debug.debug    // Switch to DEBUG level - both update together
debug.info
debug.warn
debug.error
debug.disable  // Turn everything off
```

The React UI (`<DebugPanel>`) updates live as you type. Click a level pill in the UI → console reflects it instantly. **They're always in sync.**

### What Ships

**Two npm packages (zero dependencies):**

1. **`devkit-console-core`** (13 KB gzipped)
   - `window.debug` global (works in any JS environment)
   - Namespace-scoped loggers
   - Real-time config emitter
   - Log history (ring buffer, 500 entries)
   - Export to JSON/text

2. **`devkit-console-ui`** (18 KB gzipped)
   - React hooks: `useDebugConfig()`, `useLogHistory()`, `useLogger()`
   - `<DebugPanel>` floating component (compose-friendly)
   - `<LevelSelector>`, `<LogViewer>`, `<StatusBadge>`, `<ExportButton>`
   - Dark/light theme support
   - All inline styles (zero CSS imports)

---

## Features That Matter

### 1. **Namespace Filtering**
```javascript
const auth = useLogger('Auth');
const network = useLogger('Network');

auth.info('User logged in');
network.debug('Fetching /api/users');
```

UI shows logs grouped by namespace. Click a namespace to drill down.

### 2. **Live Log Export**
- Click "Export JSON" → download full log history with metadata
- Great for: bug reports, performance analysis, QA sign-off
- No API calls, all client-side

### 3. **Floating Debug Panel**
- Compose into any React app in 2 lines
- Position: top-left, top-right, bottom-left, bottom-right
- Open/close toggle (animated)
- Responsive on mobile

### 4. **Offline First**
- No backend, no internet required
- Works in test environments, SSR, Electron, React Native
- Perfect for security-conscious teams

---

## Real-World Use Cases

### 🎮 Game Development
Monitor FPS, input state, entity updates without alt-tabbing to DevTools.

### 📱 Mobile Web
Debug on physical devices where console access is clunky. UI always visible.

### 🔍 QA / Bug Reporting
"Here's the JSON log from when it broke" → reproducible bug report.

### 🚀 Onboarding
New team member opens your app, clicks the bug button 🐛, sees live logs. Instant context.

### 🏢 Enterprise
Audit trail of debug activities. Export logs for compliance.

---

## Quick Start

```bash
npm install devkit-console-core devkit-console-ui
```

```tsx
import { DebugKitProvider } from 'devkit-console-ui';
import { DebugPanel } from 'devkit-console-ui';

export function App() {
  return (
    <DebugKitProvider>
      <DebugPanel position="bottom-right" defaultOpen={true} />
      <YourApp />
    </DebugKitProvider>
  );
}
```

Done. In DevTools console, type `debug.debug()` and watch the UI react.

---

## Live Demo

**Visit:** https://devkit-console.vercel.app

Try the scenarios:
- **Console Sync:** Type commands in DevTools, watch the UI panel update
- **Namespace Demo:** Trigger logs from Auth/Network/Render services
- **Scenario Simulator:** Burst 10 TRACE logs, watch the viewer handle it
- **Export:** Download JSON of everything

---

## Why This Exists

I spent years debugging via console.log spread across tabs and terminal windows. One day I realized: *GPS apps don't make you read coordinates. Why should debugging?* DevKit Console is that "Waze moment" for logging.

---

## Under the Hood

- **TypeScript** (strict mode, full .d.ts types)
- **React 18+ hooks** (useContext, useState, useEffect)
- **No dependencies** (core package is truly standalone)
- **Ring buffer** (bounded memory, never blows up)
- **TypedEmitter** (pub/sub without event collisions)
- **Tested** (vitest + @testing-library/react)

---

## Links

- 📦 **Core on npm:** https://www.npmjs.com/package/devkit-console-core
- ⚛️ **UI on npm:** https://www.npmjs.com/package/devkit-console-ui
- 🌟 **GitHub:** https://github.com/ikrigel/devkit-console
- 🎮 **Live Demo:** https://devkit-console.vercel.app

---

## What's Next?

v0.2.0 roadmap:
- Advanced filtering (status, date range)
- Heatmap mode (log density visualization)
- GeoJSON export for mapping/analysis
- Telemetry integration hooks
- Service Worker integration for offline PWA logging

---

## One More Thing

This is a production-ready library used in real projects. Bug reports / PRs / ideas welcome. If you've been frustrated by debugging workflows, give it a try. I think you'll appreciate the "it just works" vibe.

---

**Happy debugging.** ✨

*Igal Krigel*  
Full-stack developer | React enthusiast | Debugging tool maker  
https://github.com/ikrigel
