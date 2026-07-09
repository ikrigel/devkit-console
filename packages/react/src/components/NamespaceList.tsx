import React, { useMemo } from 'react';
import { useLogHistory } from '../hooks/useLogHistory';

export interface NamespaceListProps {
  className?: string;
}

/**
 * Shows active namespaces and their log entry counts
 * Derived reactively from log history
 */
export function NamespaceList({ className }: NamespaceListProps) {
  const entries = useLogHistory();

  const namespaces = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach((entry) => {
      counts[entry.namespace] = (counts[entry.namespace] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [entries]);

  const containerStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    marginTop: 0,
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const itemStyle: React.CSSProperties = {
    padding: '6px 0',
    fontSize: '13px',
    color: '#374151',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
    height: '20px',
    borderRadius: '3px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle} className={className}>
      <h3 style={titleStyle}>Namespaces</h3>
      {namespaces.length === 0 ? (
        <div style={{ fontSize: '12px', color: '#9ca3af' }}>No namespaces yet</div>
      ) : (
        <ul style={listStyle}>
          {namespaces.map(({ name, count }) => (
            <li key={name} style={itemStyle}>
              <span>{name}</span>
              <span style={badgeStyle}>{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
