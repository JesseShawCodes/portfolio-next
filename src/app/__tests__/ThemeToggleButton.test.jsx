import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useTheme } from '../context/ThemeContext';

// Mock the useTheme hook
jest.mock('../context/ThemeContext', () => ({
  ...jest.requireActual('../context/ThemeContext'),
  useTheme: jest.fn(),
}));

describe('ThemeToggleButton', () => {
  it('renders the sun icon when the theme is "light"', () => {
    useTheme.mockReturnValue({ theme: 'light' });
    render(<ThemeToggleButton />);
    const sunIcon = screen.getByRole('img', { hidden: true });
    expect(sunIcon).toHaveClass('fa-sun');
  });

  it('renders the moon icon when the theme is "dark"', () => {
    useTheme.mockReturnValue({ theme: 'dark' });
    render(<ThemeToggleButton />);
    const moonIcon = screen.getByRole('img', { hidden: true });
    expect(moonIcon).toHaveClass('fa-moon');
  });

  it('calls the toggleTheme function when the switch is clicked', () => {
    const toggleTheme = jest.fn();
    useTheme.mockReturnValue({ theme: 'light', toggleTheme });
    render(<ThemeToggleButton />);
    const switchInput = screen.getByRole('switch');
    fireEvent.click(switchInput);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});