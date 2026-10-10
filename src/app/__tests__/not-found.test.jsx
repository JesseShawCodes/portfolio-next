import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound page', () => {
  it('renders the not found heading and suggestions', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/Sorry, we couldn't find that page. It may have been moved, renamed, or the address might be mistyped./i)).toBeInTheDocument();
    // One more test for good measure
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });
});
