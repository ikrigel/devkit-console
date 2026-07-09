import { useContext, useMemo } from 'react';
import type { Logger } from 'devkit-console-core';
import { DebugKitContext } from '../context';

export function useLogger(namespace: string): Logger {
  const context = useContext(DebugKitContext);
  if (!context) {
    throw new Error('useLogger must be used within DebugKitProvider');
  }

  return useMemo(() => context.manager.ns(namespace), [context.manager, namespace]);
}
