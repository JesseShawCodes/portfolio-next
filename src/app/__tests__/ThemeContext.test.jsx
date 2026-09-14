import React, { useLayoutEffect, useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('provides a default theme of "light"', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('toggles the theme from "light" to "dark"', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('toggles the theme from "dark" to "light"', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('loads the theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('handles undefined theme initially', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(document.body).toHaveAttribute('data-bs-theme', 'light');
  });

  it('toggles using light fallback when theme is still undefined', () => {
    const ToggleOnUndefinedLayoutEffect = () => {
      const { theme, toggleTheme } = useTheme();
      const toggled = useRef(false);
      useLayoutEffect(() => {
        if (theme === undefined && !toggled.current) {
          toggled.current = true;
          toggleTheme();
        }
      });
      return <span data-testid="theme">{theme}</span>;
    };

    render(
      <ThemeProvider>
        <ToggleOnUndefinedLayoutEffect />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('useTheme returns context value when used outside provider', () => {
    const OutsideProviderComponent = () => {
      const context = useTheme();
      return <span data-testid="context">{context === undefined ? 'none' : 'defined'}</span>;
    };

    render(<OutsideProviderComponent />);
    expect(screen.getByTestId('context')).toHaveTextContent('none');
  });
});
