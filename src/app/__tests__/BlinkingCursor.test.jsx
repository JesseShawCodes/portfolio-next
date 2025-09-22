import React from 'react';
import { render } from '@testing-library/react';
import BlinkingCursor from '../about/BlinkingCursor';

describe('BlinkingCursor', () => {
  it('renders the cursor', () => {
    const { container } = render(<BlinkingCursor />);
    expect(container.querySelector('.blinking-cursor')).toBeInTheDocument();
  });
});
