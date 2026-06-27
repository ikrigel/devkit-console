import React, { createContext, ReactNode } from 'react';
import type { DebugManager } from '@devkit-console/core';
import { getDebugManager } from '@devkit-console/core';

export interface DebugKitContextType {
  manager: DebugManager;
}

export const DebugKitContext = createContext<DebugKitContextType | null>(null);

export interface DebugKitProviderProps {
  children: ReactNode;
  manager?: DebugManager;
}

export function DebugKitProvider({ children, manager = getDebugManager() }: DebugKitProviderProps) {
  return (
    <DebugKitContext.Provider value={{ manager }}>
      {children}
    </DebugKitContext.Provider>
  );
}
