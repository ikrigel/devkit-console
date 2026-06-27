# @devkit-console/core

Zero-dependency debug manager for browser console. Provides `window.debug` global API for controlling log levels, accessing history, and exporting logs.

## Install

```bash
npm install @devkit-console/core
```

## Quick Start

```javascript
import { debugManager } from '@devkit-console/core';

// window.debug is now available in browser console
debug.debug()           // Enable DEBUG level
debug.status()          // Show banner
debug.ns('App').info('Started')  // Namespaced logger
debug.history()         // Get log entries
debug.exportLogs('json')// Export as JSON
```

## API

See [`docs/API.md`](../../docs/API.md) for complete reference.

## Type Safety

Full TypeScript support with `DebugConfig`, `LogEntry`, `Logger` interfaces.
