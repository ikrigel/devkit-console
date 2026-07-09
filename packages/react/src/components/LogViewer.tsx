import React, { useEffect, useRef } from 'react';
import type { LogLevel, LogEntry } from 'devkit-console-core';
import { useLogHistory } from '../hooks/useLogHistory';

export interface LogViewerProps {
  namespace?: string;
  levels?: LogLevel[];
  maxVisibleLogs?: number;
  className?: string;
}

const LEVEL_COLORS: Record<LogLevel, string> = {
  ERROR: '#ef4444',
  WARN: '#f59e0b',
  INFO: '#3b82f6',
  DEBUG: '#8b5cf6',
  TRACE: '#6b7280',
};

const LEVEL_BG: Record<LogLevel, string> = {
  ERROR: '#fef2f2',
  WARN: '#fffbeb',
  INFO: '#eff6ff',
  DEBUG: '#faf5ff',
  TRACE: '#f9fafb',
};

/**
 * Scrollable log viewer with auto-scroll-to-bottom
 * Shows logs with color-coding by level
 */
export function LogViewer({
  namespace,
  levels,
  maxVisibleLogs,
  className,
}: LogViewerProps) {
  const entries = useLogHistory({
    namespace,
    levels,
    limit: maxVisibleLogs,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontFamily: 'monospace',
    fontSize: '12px',
  };

  const scrollContainerStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '8px',
  };

  const getEntryStyle = (entry: LogEntry): React.CSSProperties => ({
    padding: '6px 8px',
    marginBottom: '4px',
    borderRadius: '4px',
    backgroundColor: LEVEL_BG[entry.level],
    borderLeftColor: LEVEL_COLORS[entry.level],
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
  });

  const getLevelStyle = (level: LogLevel): React.CSSProperties => ({
    color: LEVEL_COLORS[level],
    fontWeight: 'bold',
    display: 'inline-block',
    minWidth: '60px',
    marginRight: '8px',
  });

  const getNamespaceStyle = (): React.CSSProperties => ({
    color: '#6b7280',
    marginRight: '8px',
  });

  const emptyStyle: React.CSSProperties = {
    padding: '16px',
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '13px',
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={scrollContainerStyle} ref={scrollRef}>
        {entries.length === 0 ? (
          <div style={emptyStyle}>No logs yet</div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} style={getEntryStyle(entry)}>
              <span style={getLevelStyle(entry.level)}>{entry.level}</span>
              <span style={getNamespaceStyle()}>[{entry.namespace}]</span>
              <span>{entry.message}</span>
              {entry.data !== undefined && (
                <div style={{ marginTop: '4px', marginLeft: '68px', color: '#4b5563' }}>
                  {typeof entry.data === 'object' ? (
                    <pre
                      style={{
                        margin: '4px 0 0 0',
                        padding: '4px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '2px',
                        overflow: 'auto',
                        fontSize: '11px',
                      }}
                    >
                      {JSON.stringify(entry.data as any, null, 2)}
                    </pre>
                  ) : (
                    <span>{String(entry.data as any)}</span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
