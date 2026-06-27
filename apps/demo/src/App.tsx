import { DebugKitProvider, useDebugConfig, useLogHistory, useLogger } from '@devkit-console/react';
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
      </footer>
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
