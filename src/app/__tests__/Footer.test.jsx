import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025/)).toBeInTheDocument();
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
