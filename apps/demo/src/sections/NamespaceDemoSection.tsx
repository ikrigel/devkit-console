import { useLogger, useLogHistory } from 'devkit-console-ui';

interface NamespaceDemoSectionProps {
  isDark?: boolean;
}

export function NamespaceDemoSection({ isDark = false }: NamespaceDemoSectionProps) {
  const authLogger = useLogger('Auth');
  const networkLogger = useLogger('Network');
  const renderLogger = useLogger('Render');

  const logs = useLogHistory();

  return (
    <section className="section" style={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937' }}>
      <h2 style={{ color: isDark ? '#e8edf2' : '#1f2937' }}>Namespace Demo</h2>
      <p style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>Trigger logs from different namespaces and see them appear below:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => authLogger.info('User login attempt')} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          🔐 Auth: Login
        </button>
        <button onClick={() => networkLogger.info('Fetching /api/users')} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          🌐 Network: Fetch
        </button>
        <button onClick={() => renderLogger.info('Rendering component')} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          ⚛️ Render: Update
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: isDark ? '#e8edf2' : '#1f2937' }}>Recent Logs ({logs.length})</h3>
        <div style={{ background: isDark ? '#111827' : '#f9fafb', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`, borderRadius: '0.375rem', maxHeight: '300px', overflow: 'auto' }}>
          {logs.length === 0 ? (
            <p style={{ padding: '1rem', color: isDark ? '#6b7280' : '#9ca3af', fontSize: '0.875rem' }}>No logs yet. Click buttons above to trigger.</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {logs.slice(-10).map((log) => (
                <li
                  key={log.id}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    color: isDark ? '#d1d5db' : '#1f2937'
                  }}
                >
                  <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  {' '}
                  <span style={{ background: getLevelColor(log.level), color: 'white', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.5rem' }}>
                    {log.level}
                  </span>
                  <span style={{ color: '#3b82f6' }}>[{log.namespace}]</span>
                  {' '}
                  {log.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    ERROR: '#ef4444',
    WARN: '#f59e0b',
    INFO: '#3b82f6',
    DEBUG: '#8b5cf6',
    TRACE: '#6b7280',
  };
  return colors[level] || '#6b7280';
}
