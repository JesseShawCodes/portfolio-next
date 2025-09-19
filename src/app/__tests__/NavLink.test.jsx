'use client';
import { render, screen } from '@testing-library/react';
import NavLink from '../components/NavLink';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavLink', () => {
  it('renders the NavLink component with the correct text', () => {
    usePathname.mockReturnValue('/about');
    render(<NavLink name="Resume" link="/resume" />);
    expect(screen.getByText(/Resume/)).toBeInTheDocument();
  });

  it('applies the active class when the link is active', () => {
    usePathname.mockReturnValue('/resume');
    render(<NavLink name="Resume" link="/resume" />);
    expect(screen.getByRole('link')).toHaveClass('active');
  });

  it('does not apply the active class when the link is not active', () => {
    usePathname.mockReturnValue('/about');
    render(<NavLink name="Resume" link="/resume" />);
    expect(screen.getByRole('link')).not.toHaveClass('active');
  });
});
