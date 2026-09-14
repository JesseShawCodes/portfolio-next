import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TerminalProvider, useTerminal } from '../context/TerminalContext';

const TestComponent = () => {
  const { terminalLoadAll, loadAllTerminalContent } = useTerminal();
  return (
    <div>
      <span data-testid="terminal-load-all">{terminalLoadAll ? 'true' : 'false'}</span>
      <button onClick={loadAllTerminalContent}>Load All</button>
    </div>
  );
};

describe('TerminalContext', () => {
  it('provides a default terminalLoadAll of false', () => {
    render(
      <TerminalProvider>
        <TestComponent />
      </TerminalProvider>
    );
    expect(screen.getByTestId('terminal-load-all')).toHaveTextContent('false');
  });

  it('sets terminalLoadAll to true when loadAllTerminalContent is called', () => {
    render(
      <TerminalProvider>
        <TestComponent />
      </TerminalProvider>
    );
    fireEvent.click(screen.getByText('Load All'));
    expect(screen.getByTestId('terminal-load-all')).toHaveTextContent('true');
  });

  it('useTerminal returns context value when used outside provider', () => {
    const OutsideProviderComponent = () => {
      const context = useTerminal();
      return <span data-testid="context">{context === undefined ? 'none' : 'defined'}</span>;
    };

    render(<OutsideProviderComponent />);
    expect(screen.getByTestId('context')).toHaveTextContent('none');
  });
});
