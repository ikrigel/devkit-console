import { useDebugConfig } from 'devkit-console-ui';

interface ConsoleSyncSectionProps {
  isDark?: boolean;
}

export function ConsoleSyncSection({ isDark = false }: ConsoleSyncSectionProps) {
  const config = useDebugConfig();

  return (
    <section className="section" style={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937' }}>
      <h2 style={{ color: isDark ? '#e8edf2' : '#1f2937' }}>Console Sync Demo</h2>
      <p style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>Open browser console (F12) and type:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <CommandButton cmd="debug.debug()" label="Enable DEBUG" isDark={isDark} />
        <CommandButton cmd="debug.trace()" label="Enable TRACE" isDark={isDark} />
        <CommandButton cmd="debug.warn()" label="Enable WARN" isDark={isDark} />
        <CommandButton cmd="debug.disable()" label="Disable all" isDark={isDark} />
      </div>
      <div style={{ marginTop: '2rem', padding: '1rem', background: isDark ? '#111827' : '#f3f4f6', borderRadius: '0.375rem', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280' }}>Current Status:</p>
        <p style={{ margin: 0, fontWeight: 600, fontFamily: 'monospace', color: isDark ? '#e8edf2' : '#1f2937' }}>
          {config.enabled ? '✓ Enabled' : '○ Disabled'} at level <span style={{ color: '#3b82f6' }}>{config.level}</span>
        </p>
      </div>
    </section>
  );
}

function CommandButton({ cmd, label, isDark = false }: { cmd: string; label: string; isDark?: boolean }) {
  return (
    <button
      onClick={() => {
        alert(`Type in console: ${cmd}`);
      }}
      style={{
        width: '100%',
        backgroundColor: isDark ? '#374151' : '#ffffff',
        color: isDark ? '#e8edf2' : '#1f2937',
        border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
        padding: '0.5rem',
        borderRadius: '0.375rem',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
}
