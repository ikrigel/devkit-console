import { useContext, useState, useEffect } from 'react';
import type { DebugConfig } from 'devkit-console-core';
import { DebugKitContext } from '../context';

export function useDebugConfig(): DebugConfig {
  const context = useContext(DebugKitContext);
  if (!context) {
    throw new Error('useDebugConfig must be used within DebugKitProvider');
  }

  const [config, setConfig] = useState<DebugConfig>(() => context.manager.getConfig());

  useEffect(() => {
    return context.manager.onConfigChange(({ config }) => {
      setConfig({ ...config });
    });
  }, [context.manager]);

  return config;
}
