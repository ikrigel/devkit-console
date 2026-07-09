import { useContext, useState, useEffect } from 'react';
import type { LogEntry, LogLevel } from 'devkit-console-core';
import { DebugKitContext } from '../context';

export interface LogHistoryFilters {
  namespace?: string;
  levels?: LogLevel[];
  limit?: number;
}

export function useLogHistory(filters?: LogHistoryFilters): readonly LogEntry[] {
  const context = useContext(DebugKitContext);
  if (!context) {
    throw new Error('useLogHistory must be used within DebugKitProvider');
  }

  const [entries, setEntries] = useState<LogEntry[]>(() => {
    return filterLogs(context.manager.getHistory() as LogEntry[], filters);
  });

  useEffect(() => {
    return context.manager.onLogChange(({ entries }) => {
      setEntries(filterLogs(entries as LogEntry[], filters));
    });
  }, [context.manager, filters?.namespace, filters?.levels, filters?.limit]);

  return entries;
}

function filterLogs(entries: LogEntry[], filters?: LogHistoryFilters): LogEntry[] {
  let filtered = entries;

  if (filters?.namespace) {
    filtered = filtered.filter(e => e.namespace === filters.namespace);
  }

  if (filters?.levels && filters.levels.length > 0) {
    filtered = filtered.filter(e => filters.levels!.includes(e.level));
  }

  if (filters?.limit) {
    filtered = filtered.slice(-filters.limit);
  }

  return filtered;
}
