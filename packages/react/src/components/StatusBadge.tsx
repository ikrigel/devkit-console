import React from 'react';
import { useDebugConfig } from '../hooks/useDebugConfig';

export interface StatusBadgeProps {
  className?: string;
}

/**
 * Small pill showing current debug status and level
 * Example: "● DEBUG" or "○ OFF"
 */
export function StatusBadge({ className }: StatusBadgeProps) {
  const config = useDebugConfig();

  const statusStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '12px',
    backgroundColor: config.enabled ? '#e0f2fe' : '#f3f4f6',
    color: config.enabled ? '#0369a1' : '#6b7280',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  return (
    <div style={statusStyle} className={className}>
      <span style={{ fontSize: '14px' }}>
        {config.enabled ? '●' : '○'}
      </span>
      <span>{config.enabled ? config.level : 'OFF'}</span>
    </div>
  );
}
