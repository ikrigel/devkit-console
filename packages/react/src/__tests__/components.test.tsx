import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DebugKitProvider } from '../context';
import { StatusBadge } from '../components/StatusBadge';
import { LevelSelector } from '../components/LevelSelector';
import { DebugPanel } from '../components/DebugPanel';

describe('React Components', () => {
  it('should render StatusBadge', () => {
    const { container } = render(
      <DebugKitProvider>
        <StatusBadge />
      </DebugKitProvider>
    );
    expect(container.querySelector('div')).toBeDefined();
  });

  it('should render LevelSelector', () => {
    const { container } = render(
      <DebugKitProvider>
        <LevelSelector />
      </DebugKitProvider>
    );
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render DebugPanel', () => {
    const { container } = render(
      <DebugKitProvider>
        <DebugPanel />
      </DebugKitProvider>
    );
    expect(container.querySelector('div')).toBeDefined();
  });
});
