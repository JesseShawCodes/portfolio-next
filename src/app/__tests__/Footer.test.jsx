import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { getLocale } from '../../config/locale';

describe('Footer', () => {
  const originalEnv = process.env;
  const { site } = getLocale();

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders the footer component', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026/)).toBeInTheDocument();
  });

  it('falls back to the locale site name when NEXT_PUBLIC_NAME is unset', () => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_NAME;

    render(<Footer />);

    expect(screen.getByText(new RegExp(`© 2026 ${site.name}`))).toBeInTheDocument();
  });

  it('uses NEXT_PUBLIC_NAME when set', () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_NAME: 'Custom Name' };

    render(<Footer />);

    expect(screen.getByText(/© 2026 Custom Name/)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByTitle('Instagram')).toBeInTheDocument();
    expect(screen.getByTitle('LinkedIn')).toBeInTheDocument();
    expect(screen.getByTitle('Twitter')).toBeInTheDocument();
    expect(screen.getByTitle('GitHub')).toBeInTheDocument();
  });

  it('has the correct href attributes', () => {
    render(<Footer />);
    expect(screen.getByTitle('Instagram').closest('a')).toHaveAttribute('href', 'https://www.instagram.com/jesseshawcodes/');
    expect(screen.getByTitle('LinkedIn').closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/itsjesseshaw/');
    expect(screen.getByTitle('Twitter').closest('a')).toHaveAttribute('href', 'https://x.com/jesseshawcodes');
    expect(screen.getByTitle('GitHub').closest('a')).toHaveAttribute('href', 'http://github.com/jesseShawCodes');
  });

  it('links open in a new tab', () => {
    render(<Footer />);
    expect(screen.getByTitle('Instagram').closest('a')).toHaveAttribute('target', '_blank');
    expect(screen.getByTitle('LinkedIn').closest('a')).toHaveAttribute('target', '_blank');
    expect(screen.getByTitle('Twitter').closest('a')).toHaveAttribute('target', '_blank');
    expect(screen.getByTitle('GitHub').closest('a')).toHaveAttribute('target', '_blank');
  });
});
