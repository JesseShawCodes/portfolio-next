import { render, screen } from '@testing-library/react';
import NavLink from '../components/NavLink';

describe('NavLink', () => {
  it('renders the footer component', () => {
    render(<NavLink name="Resume" link="/resume" />);
    expect(screen.getByText(/Resume/)).toBeInTheDocument();
  });
});
