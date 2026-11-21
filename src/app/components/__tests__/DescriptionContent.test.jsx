import React from 'react';
import { render, screen } from '@testing-library/react';
import DescriptionContent from '../DescriptionContent';

describe('DescriptionContent', () => {
  it('renders array items as paragraphs when asParagraphs is true', () => {
    render(<DescriptionContent description={['First', 'Second']} asParagraphs />);

    expect(screen.getByText('First').tagName).toBe('P');
    expect(screen.getByText('Second').tagName).toBe('P');
  });

  it('renders a single-item array as a paragraph', () => {
    render(<DescriptionContent description={['Only one']} />);

    expect(screen.getByText('Only one').tagName).toBe('P');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a multi-item array as a list', () => {
    render(<DescriptionContent description={['One', 'Two']} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('One').tagName).toBe('LI');
    expect(screen.getByText('Two').tagName).toBe('LI');
  });

  it('renders a string description as markdown', () => {
    render(<DescriptionContent description="Plain text description" />);

    expect(screen.getByText('Plain text description')).toBeInTheDocument();
  });
});
