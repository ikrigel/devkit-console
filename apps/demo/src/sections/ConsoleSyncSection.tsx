import { useDebugConfig } from '@devkit-console/react';

export function ConsoleSyncSection() {
  const config = useDebugConfig();

  return (
    <section className="section">
      <h2>Console Sync Demo</h2>
      <p>Open browser console (F12) and type:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <CommandButton cmd="debug.debug()" label="Enable DEBUG" />
        <CommandButton cmd="debug.trace()" label="Enable TRACE" />
        <CommandButton cmd="debug.warn()" label="Enable WARN" />
        <CommandButton cmd="debug.disable()" label="Disable all" />
      </div>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.375rem' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>Current Status:</p>
        <p style={{ margin: 0, fontWeight: 600, fontFamily: 'monospace' }}>
          {config.enabled ? '✓ Enabled' : '○ Disabled'} at level <span style={{ color: '#3b82f6' }}>{config.level}</span>
        </p>
      </div>
    </section>
  );
}

function CommandButton({ cmd, label }: { cmd: string; label: string }) {
  return (
    <button
      onClick={() => {
        // This is just UI - the actual command needs to be typed in console
        alert(`Type in console: ${cmd}`);
      }}
      style={{ width: '100%' }}
    >
      {label}
    </button>
  );
}
