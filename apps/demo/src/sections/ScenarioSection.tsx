import { useLogger } from 'devkit-console-ui';

interface ScenarioSectionProps {
  isDark?: boolean;
}

export function ScenarioSection({ isDark = false }: ScenarioSectionProps) {
  const simulator = useLogger('Simulator');

  const runScenario = (name: string, count: number, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO') => {
    simulator.info(`Scenario: ${name}`);
    const logFn = simulator[level.toLowerCase() as 'warn' | 'error' | 'info'];
    for (let i = 1; i <= count; i++) {
      (logFn as any).call(simulator, `${name} - Event ${i}`);
    }
  };

  return (
    <section className="section" style={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937' }}>
      <h2 style={{ color: isDark ? '#e8edf2' : '#1f2937' }}>Scenario Simulator</h2>
      <p style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>Trigger predefined logging scenarios to test DevKit Console behavior:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={() => runScenario('INFO Burst', 5)} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          📊 5 Info Logs
        </button>
        <button onClick={() => runScenario('WARNING Events', 3, 'WARN')} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          ⚠️ 3 Warn Logs
        </button>
        <button onClick={() => runScenario('ERROR Sequence', 2, 'ERROR')} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          ❌ 2 Error Logs
        </button>
        <button onClick={() => runScenario('TRACE Flood', 10)} style={{ width: '100%', backgroundColor: isDark ? '#374151' : '#ffffff', color: isDark ? '#e8edf2' : '#1f2937', border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
          🌊 10 Trace Logs
        </button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: isDark ? '#7f1d1d' : '#fef2f2', borderLeft: `4px solid ${isDark ? '#dc2626' : '#ef4444'}`, borderRadius: '0.375rem' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: isDark ? '#fca5a5' : '#7f1d1d' }}>
          💡 <strong>Tip:</strong> Use the console or level selector to filter logs and see how DevKit Console handles high-volume logging.
        </p>
      </div>
    </section>
  );
}
