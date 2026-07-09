import { DebugKitProvider, useDebugConfig, useLogHistory, useLogger, DebugPanel } from '@devkit-console/react';
import { HeroSection } from './sections/HeroSection';
import { ConsoleSyncSection } from './sections/ConsoleSyncSection';
import { NamespaceDemoSection } from './sections/NamespaceDemoSection';
import { ScenarioSection } from './sections/ScenarioSection';
import './App.css';

function AppContent() {
  const config = useDebugConfig();
  const logger = useLogger('App');

  return (
    <div className="app">
      <header className="header">
        <h1>DevKit Console Demo</h1>
        <div className="status-badge">
          {config.enabled ? '● ' : '○ '} {config.level}
        </div>
      </header>

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
