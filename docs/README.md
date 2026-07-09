# Installation & Quick Start

## Install

```bash
npm install @devkit-console/core @devkit-console/react
# or
pnpm add @devkit-console/core @devkit-console/react
```

## Quick Start

### Core Package Only

If you only want the debug manager without React UI:

```typescript
import { getDebugManager } from '@devkit-console/core';

const debug = getDebugManager();

// Change log level from console
debug.setLevel('DEBUG', 'console');

// Create a namespace logger
const logger = debug.ns('MyApp');
logger.log('Info message'); // Only shows if level >= INFO

// Export logs
const jsonLogs = debug.exportLogs('json');
const textLogs = debug.exportLogs('text');
```

### React Package (with UI)

```typescript
import React from 'react';
import { DebugKitProvider, DebugPanel, useDebugConfig } from '@devkit-console/react';

function App() {
  return (
    <DebugKitProvider>
      <div>
        <YourApp />
        {/* Floating debug panel with all UI components */}
        <DebugPanel
          position="bottom-right"
          defaultOpen={false}
          showLogViewer={true}
          showExport={true}
          showNamespaces={true}
        />
      </div>
    </DebugKitProvider>
  );
}

// Inside your app components
function MyComponent() {
  const config = useDebugConfig(); // Reads live config
  const logger = useLogger('MyComponent');

  return (
    <div>
      Debug is {config.enabled ? 'enabled' : 'disabled'} at level {config.level}
    </div>
  );
}
```

## Browser Console API

Once loaded, you get a global `window.debug` object:

```javascript
// From browser console (F12)
debug.debug()        // Set level to DEBUG (shows debug logs)
debug.trace()        // Set level to TRACE (most verbose)
debug.info()         // Set level to INFO
debug.warn()         // Set level to WARN
debug.error()        // Set level to ERROR (only errors shown)
debug.disable()      // Disable logging entirely
debug.enable()       // Re-enable logging
debug.status()       // Show current status banner
debug.version()      // Show version
debug.history()      // Get array of all logged entries
debug.exportLogs('json') // Export as JSON string
debug.exportLogs('text') // Export as formatted text
debug.clearHistory() // Clear all logs
debug.ns('namespace') // Create/get namespaced logger
```

## Features

- **Zero dependencies** in core package
- **TypeScript support** with full type definitions
- **Bidirectional sync** between console API and React UI
- **Namespace support** for scoped loggers
- **Persistent storage** (localStorage) of configuration
- **Log history** with ring buffer (configurable size)
- **Export functionality** (JSON/text download)
- **Drop-in React components** with no CSS imports required

## Common Patterns

### Conditional Logging Based on Level

```typescript
const logger = debug.ns('Network');

logger.trace('Trace message');  // Only shows if level >= TRACE
logger.debug('Debug message');  // Only shows if level >= DEBUG
logger.info('Info message');    // Only shows if level >= INFO
logger.warn('Warning!');        // Only shows if level >= WARN
logger.error('Error!');         // Always shown (highest severity)
```

### Log with Data

```typescript
logger.info('User login', {
  userId: 123,
  timestamp: Date.now(),
  ipAddress: '192.168.1.1',
});
```

### Use with Custom DebugManager

```typescript
import { createDebugManager, noopStorageAdapter } from '@devkit-console/core';

// Create instance with no-op storage (no persistence)
const manager = createDebugManager(noopStorageAdapter, 'DEBUG');

// Or use singleton
import { getDebugManager } from '@devkit-console/core';
const manager = getDebugManager();
```

## Next Steps

- Read [API.md](API.md) for complete API reference
- Check [CHANGELOG.md](CHANGELOG.md) for version history
- Explore the [demo app](../apps/demo) for live examples
