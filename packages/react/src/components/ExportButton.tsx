import React, { useState } from 'react';
import { useDebugManager } from '../hooks/useDebugManager';

export interface ExportButtonProps {
  format?: 'json' | 'text';
  className?: string;
}

/**
 * Button to export logs as JSON or text file
 * Downloads file with timestamp
 */
export function ExportButton({
  format = 'json',
  className,
}: ExportButtonProps) {
  const manager = useDebugManager();
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = () => {
    try {
      setIsLoading(true);
      const logData = manager.exportLogs(format);
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `debug-logs-${timestamp}.${format === 'json' ? 'json' : 'txt'}`;

      const blob = new Blob([logData], {
        type: format === 'json' ? 'application/json' : 'text/plain',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#fff',
    color: '#374151',
    fontSize: '13px',
    fontWeight: '500',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.6 : 1,
    transition: 'all 150ms ease',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      style={buttonStyle}
      className={className}
      title={`Export logs as ${format.toUpperCase()}`}
    >
      {isLoading ? '⏳ Exporting...' : `📥 Export (${format.toUpperCase()})`}
    </button>
  );
}
