# DevKit Console Library

Standalone production-quality npm library for bidirectional debug level control between browser console and React UI.

## Quick Start

```bash
pnpm install
pnpm build          # Build all packages
pnpm test           # Run all tests
pnpm dev            # Start demo app (http://localhost:5173)
```

## Packages

- **`@devkit-console/core`** — Zero-deps, pure TypeScript. DebugManager, Logger, storage.
- **`@devkit-console/react`** — React hooks and components for UI integration.

## Demo App

Interactive demo with console sync, namespace filtering, scenario simulator, and export features.

See `apps/demo/` for full demo source.

## Documentation

- [`docs/README.md`](docs/README.md) — Installation and quick start
- [`docs/API.md`](docs/API.md) — Full API reference
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — Version history

## Development

```bash
# Build a specific package
pnpm --filter @devkit-console/core build

# Run tests for a specific package
pnpm --filter @devkit-console/core test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## License

MIT
