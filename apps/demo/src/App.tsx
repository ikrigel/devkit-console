import React, { useState } from 'react';
import { DebugKitProvider, useDebugConfig, useLogHistory, useLogger, DebugPanel } from 'devkit-console-ui';
import { HeroSection } from './sections/HeroSection';
import { ConsoleSyncSection } from './sections/ConsoleSyncSection';
import { NamespaceDemoSection } from './sections/NamespaceDemoSection';
import { ScenarioSection } from './sections/ScenarioSection';
import { AboutModal } from './components/AboutModal';
import { ParallaxBackground } from './components/ParallaxBackground';
import { useTheme } from './hooks/useTheme';
import './App.css';

function AppContent() {
  const [showAbout, setShowAbout] = useState(false);
  const { mode, isDark, setThemeMode } = useTheme();
  const config = useDebugConfig();
  const logger = useLogger('App');

  return (
    <div className="app" style={{ backgroundColor: isDark ? '#0f172a' : '#f0f9ff', color: isDark ? '#e8edf2' : '#1f2937' }}>
      <ParallaxBackground isDark={isDark} />
      <header className="header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        color: isDark ? '#e8edf2' : '#1f2937'
      }}>
        <h1>DevKit Console Demo</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="status-badge">
            {config.enabled ? '● ' : '○ '} {config.level}
          </div>

          {/* Theme Selector */}
          <select
            value={mode}
            onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark' | 'auto')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#e8edf2' : '#1f2937',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            <option value="auto">🌗 Auto</option>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>

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

      <main className="main" style={{ color: isDark ? '#e8edf2' : '#1f2937' }}>
        <HeroSection isDark={isDark} />
        <ConsoleSyncSection isDark={isDark} />
        <NamespaceDemoSection isDark={isDark} />
        <ScenarioSection isDark={isDark} />
      </main>

      <footer className="footer" style={{
        backgroundColor: isDark ? '#111827' : '#f9fafb',
        borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        color: isDark ? '#d1d5db' : '#6b7280'
      }}>
        <p>
          Open browser console (F12) and type <code style={{ backgroundColor: isDark ? '#1f2937' : '#f3f4f6', color: isDark ? '#60a5fa' : '#0c4a6e', padding: '2px 6px', borderRadius: '4px' }}>debug.debug()</code> to see live synchronization
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
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
