import React, { useState, useCallback } from 'react';
import { StatusBadge } from './StatusBadge';
import { LevelSelector } from './LevelSelector';
import { LogViewer } from './LogViewer';
import { ExportButton } from './ExportButton';
import { NamespaceList } from './NamespaceList';
import { useDebugConfig } from '../hooks/useDebugConfig';

export interface DebugPanelProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showLogViewer?: boolean;
  showExport?: boolean;
  showNamespaces?: boolean;
  showVersion?: boolean;
  maxVisibleLogs?: number;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

/**
 * Floating debug panel that composes all components
 * Can be controlled/uncontrolled
 */
export function DebugPanel({
  position = 'bottom-right',
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  showLogViewer = true,
  showExport = true,
  showNamespaces = true,
  showVersion = false,
  maxVisibleLogs = 100,
  theme = 'light',
  className,
}: DebugPanelProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const config = useDebugConfig();

  const handleToggle = useCallback(() => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen((prev) => !prev);
    }
    onOpenChange?.(!isOpen);
  }, [isOpen, controlledOpen, onOpenChange]);

  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      width: '400px',
      maxHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
    };

    switch (position) {
      case 'top-left':
        return { ...base, top: '16px', left: '16px' };
      case 'top-right':
        return { ...base, top: '16px', right: '16px' };
      case 'bottom-left':
        return { ...base, bottom: '16px', left: '16px' };
      case 'bottom-right':
      default:
        return { ...base, bottom: '16px', right: '16px' };
    }
  };

  const panelStyle: React.CSSProperties = {
    ...getPositionStyles(),
    backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
    borderRadius: '8px',
    boxShadow:
      theme === 'dark'
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 150ms ease',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    transformOrigin:
      position === 'top-left'
        ? 'top left'
        : position === 'top-right'
          ? 'top right'
          : position === 'bottom-left'
            ? 'bottom left'
            : 'bottom right',
  };

  const headerStyle: React.CSSProperties = {
    padding: '12px 16px',
    backgroundColor: theme === 'dark' ? '#111827' : '#f3f4f6',
    borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: theme === 'dark' ? '#f3f4f6' : '#111827',
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: theme === 'dark' ? '#f3f4f6' : '#111827',
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'fixed',
    ...getPositionStyles(),
    width: '48px',
    height: '48px',
    padding: 0,
    borderRadius: '24px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    display: isOpen ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 150ms ease',
  };

  return (
    <>
      {/* Toggle button (visible when closed) */}
      <button
        onClick={handleToggle}
        style={toggleButtonStyle}
        title="Open Debug Panel"
      >
        🐛
      </button>

      {/* Panel (visible when open) */}
      <div style={panelStyle} className={className}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>🔍 DevKit Console</h2>
          <button
            onClick={handleToggle}
            style={closeButtonStyle}
            title="Close Debug Panel"
          >
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          {/* Status badge */}
          <StatusBadge />

          {/* Level selector */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Log Level
            </div>
            <LevelSelector />
          </div>

          {/* Export buttons */}
          {showExport && (
            <div
              style={{
                display: 'flex',
                gap: '6px',
              }}
            >
              <ExportButton format="json" />
              <ExportButton format="text" />
            </div>
          )}

          {/* Namespaces list */}
          {showNamespaces && <NamespaceList />}

          {/* Log viewer */}
          {showLogViewer && (
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Recent Logs
              </div>
              <LogViewer maxVisibleLogs={maxVisibleLogs} />
            </div>
          )}

          {/* Version info */}
          {showVersion && (
            <div
              style={{
                fontSize: '11px',
                color: theme === 'dark' ? '#6b7280' : '#9ca3af',
                padding: '6px 8px',
                backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
                borderRadius: '4px',
              }}
            >
              v{config.version}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
