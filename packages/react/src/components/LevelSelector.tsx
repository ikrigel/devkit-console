import React from 'react';
import type { LogLevel } from 'devkit-console-core';
import { useDebugConfig } from '../hooks/useDebugConfig';
import { useDebugManager } from '../hooks/useDebugManager';

export interface LevelSelectorProps {
  className?: string;
}

const LEVELS: LogLevel[] = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

const LEVEL_COLORS: Record<LogLevel, { bg: string; text: string }> = {
  ERROR: { bg: '#fee2e2', text: '#991b1b' },
  WARN: { bg: '#fef3c7', text: '#92400e' },
  INFO: { bg: '#dbeafe', text: '#0c4a6e' },
  DEBUG: { bg: '#ede9fe', text: '#4c1d95' },
  TRACE: { bg: '#f3f4f6', text: '#374151' },
};

/**
 * Five-pill selector for log level
 * Click a pill to change level; active pill is highlighted
 */
export function LevelSelector({ className }: LevelSelectorProps) {
  const config = useDebugConfig();
  const manager = useDebugManager();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
  };

  const getPillStyle = (level: LogLevel, isActive: boolean): React.CSSProperties => {
    const colors = LEVEL_COLORS[level];
    return {
      padding: '6px 12px',
      borderRadius: '6px',
      border: isActive ? `2px solid ${colors.text}` : '1px solid transparent',
      backgroundColor: isActive ? colors.bg : '#f9fafb',
      color: isActive ? colors.text : '#9ca3af',
      fontWeight: isActive ? '600' : '500',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    };
  };

  return (
    <div style={containerStyle} className={className}>
      {LEVELS.map((level) => (
        <button
          key={level}
          style={getPillStyle(level, config.level === level)}
          onClick={() => manager.setLevel(level, 'ui')}
          title={`Set log level to ${level}`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
