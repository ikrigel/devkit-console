export function HeroSection() {
  return (
    <section className="section">
      <h2>Welcome to DevKit Console</h2>
      <p>
        A production-quality npm library for bidirectional debug level control between browser
        console and React UI.
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Quick Start</h3>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', overflow: 'auto' }}>
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
