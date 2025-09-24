
import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../page';
import { TerminalProvider } from '../../context/TerminalContext';

describe('About Page', () => {
  it('renders the main heading', () => {
    render(
      <TerminalProvider>
        <About />
      </TerminalProvider>
    );
    const heading = screen.getByRole('heading', { name: /About Me/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the Terminal component', () => {
    const { container } = render(
      <TerminalProvider>
        <About />
      </TerminalProvider>
    );
    const terminalComponent = container.querySelector('.terminal-mock');
    expect(terminalComponent).toBeInTheDocument();
  });
});
