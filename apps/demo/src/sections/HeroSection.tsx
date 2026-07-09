interface HeroSectionProps {
  isDark?: boolean;
}

export function HeroSection({ isDark = false }: HeroSectionProps) {
  return (
    <section className="section" style={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937' }}>
      <h2 style={{ color: isDark ? '#e8edf2' : '#1f2937' }}>Welcome to DevKit Console</h2>
      <p style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>
        A production-quality npm library for bidirectional debug level control between browser
        console and React UI.
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: isDark ? '#e8edf2' : '#1f2937' }}>Quick Start</h3>
        <pre style={{ background: isDark ? '#111827' : '#f3f4f6', color: isDark ? '#e8edf2' : '#1f2937', padding: '1rem', borderRadius: '0.375rem', overflow: 'auto', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
{`npm install devkit-console-core devkit-console-ui

import { DebugKitProvider } from 'devkit-console-ui';

export function App() {
  return (
    <DebugKitProvider>
      <YourApp />
    </DebugKitProvider>
  );
}`}
        </pre>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="https://www.npmjs.com/package/devkit-console-core"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'background-color 150ms ease'
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            📦 Core on npm
          </a>
          <a
            href="https://www.npmjs.com/package/devkit-console-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'background-color 150ms ease'
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            ⚛️ UI on npm
          </a>
          <a
            href="https://github.com/ikrigel/devkit-console"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              color: isDark ? '#e8edf2' : '#1f2937',
              border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#e5e7eb';
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
              }
            }}
          >
            ⭐ GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
