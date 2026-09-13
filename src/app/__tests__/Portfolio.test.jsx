import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../portfolio/page';

describe('Portfolio Page', () => {
  it('renders the portfolio page with projects and repos', () => {
    render(<Page />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Personal Portfolio')).toBeInTheDocument();
    expect(screen.getByText('portfolio-next')).toBeInTheDocument();
    expect(screen.getByText('juce_synth_1')).toBeInTheDocument();
    expect(screen.getByText('dadgad')).toBeInTheDocument();
  });
});
