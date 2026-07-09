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
      </div>
    </section>
  );
}
