import { useContext } from 'react';
import { DebugKitContext } from '../context';

/**
 * Internal hook to get the debug manager from context with null-check
 * Used by all hooks and components to avoid repeating the same error handling
 */
export function useDebugManager() {
  const context = useContext(DebugKitContext);
  if (!context) {
    throw new Error('useDebugManager must be used within DebugKitProvider');
  }
  return context.manager;
}
