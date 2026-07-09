import React, { useState } from 'react';
import { DebugKitProvider, useDebugConfig, useLogHistory, useLogger, DebugPanel } from 'devkit-console-ui';
import { HeroSection } from './sections/HeroSection';
import { ConsoleSyncSection } from './sections/ConsoleSyncSection';
import { NamespaceDemoSection } from './sections/NamespaceDemoSection';
import { ScenarioSection } from './sections/ScenarioSection';
import { AboutModal } from './components/AboutModal';
import { ParallaxBackground } from './components/ParallaxBackground';
import './App.css';

function AppContent() {
  const [showAbout, setShowAbout] = useState(false);
  const config = useDebugConfig();
  const logger = useLogger('App');

  return (
    <div className="app">
      <ParallaxBackground />
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>DevKit Console Demo</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="status-badge">
            {config.enabled ? '● ' : '○ '} {config.level}
          </div>
          <button
            onClick={() => setShowAbout(true)}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#4b5563',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
            title="About the creator"
          >
            About Me
          </button>
        </div>
      </header>

      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

      <main className="main">
        <HeroSection />
        <ConsoleSyncSection />
        <NamespaceDemoSection />
        <ScenarioSection />
      </main>

      <footer className="footer">
        <p>
          Open browser console (F12) and type <code>debug.debug()</code> to see live synchronization
        </p>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>
          💡 Click the debug bug button (bottom-right) to open the interactive DebugPanel
        </p>
      </footer>

      {/* Floating debug panel - bottom right */}
      <DebugPanel
        position="bottom-right"
        defaultOpen={false}
        showLogViewer={true}
        showExport={true}
        showNamespaces={true}
        showVersion={true}
        maxVisibleLogs={50}
      />
    </div>
  );
}

export function App() {
  return (
    <DebugKitProvider>
      <AppContent />
    </DebugKitProvider>
  );
}
