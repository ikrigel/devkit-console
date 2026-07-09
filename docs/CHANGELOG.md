# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-09

### Added

#### @devkit-console/core
- **DebugManager** class for centralized debug state management
  - Log level control with threshold-based filtering
  - Namespace-scoped loggers via `.ns()`
  - Persistent configuration (localStorage)
  - Event emitters for config and log history changes
  - Export functionality (JSON/text formats)
- **Logger** class for namespace-scoped logging
  - Five log levels: ERROR, WARN, INFO, DEBUG, TRACE
  - Supports structured data logging
- **TypedEmitter** for type-safe event pub/sub
- **LogHistory** ring buffer for log storage
  - Configurable max size (default 500)
  - JSON/text export
- **Storage adapters**
  - Default: localStorage with safe error handling
  - No-op: for testing/temporary instances
- **Window global API**
  - Auto-installed as `window.debug`
  - Console commands for level control: `debug.debug()`, `debug.trace()`, etc.
  - Status banner printing
  - Direct manager access for advanced usage
- **TypeScript support** with strict type definitions

#### @devkit-console/react
- **DebugKitProvider** React context for wrapping apps
- **Hooks**
  - `useDebugConfig()` - subscribe to config changes
  - `useLogHistory()` - subscribe to log changes with filtering
  - `useLogger()` - get namespaced logger for component
  - `useDebugManager()` - internal helper (dedupes context checks)
- **UI Components**
  - `StatusBadge` - pill showing status (enabled/disabled + level)
  - `LevelSelector` - 5-button pill group for level selection
  - `LogViewer` - scrollable colored log history
  - `ExportButton` - JSON/text download
  - `NamespaceList` - active namespaces with counts
  - `DebugPanel` - floating panel composing all components
- **Component Features**
  - Inline styles only (zero CSS imports)
  - Full TypeScript prop interfaces
  - Dark/light theme support
  - Controlled/uncontrolled component patterns
  - 4 position variants for floating panel

#### Demo App
- Interactive demo showcasing console-UI sync
- Live sections: Hero, Console Sync, Namespace Demo, Scenario Simulator
- Floating DebugPanel integrated into main app

#### Documentation
- Quick start guide (installation + common patterns)
- Full API reference (core + react)
- CHANGELOG (this file)

#### CI/CD
- GitHub Actions workflows for build/test/publish (configured in Phase E)

### Technical Details

- **Package sizes** (gzipped):
  - @devkit-console/core: ~3KB
  - @devkit-console/react: ~8KB
- **Dependencies**:
  - core: zero runtime dependencies
  - react: peer depends on React 17+
- **Browser support**: All modern browsers with localStorage + ES2020 support
- **Node.js support**: 14+

### Known Limitations

- Log history is in-memory only (lost on page reload unless exported)
- Storage is local to browser (no cloud sync)
- No encryption on exported logs

### Testing

- 30 unit tests for core package (logger, manager, emitter, history)
- 3 component rendering tests for react package
- 100% test file coverage

---

## Roadmap (Future Versions)

### 0.2.0 (Planned)
- Cloud persistence option (Firebase/Supabase)
- Remote log aggregation
- Advanced filtering UI in LogViewer
- Log search functionality

### 0.3.0 (Planned)
- Plugin system for custom handlers
- Log streams (e.g., send to external service)
- Performance profiling integration
- Service worker support

### 1.0.0 (Planned)
- Stable API guarantee
- Performance optimizations
- Advanced analytics
- Enterprise features (access control, audit logs)

---

## Contributing

Issues and pull requests welcome at https://github.com/ikrigel/devkit-console

---

## License

MIT - See LICENSE file in repository root
