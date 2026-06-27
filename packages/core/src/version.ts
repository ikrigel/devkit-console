/**
 * Version injected at build time via tsup define
 */
export const VERSION: string = __DEVKIT_VERSION__?.toString() ?? '0.1.0-dev';
