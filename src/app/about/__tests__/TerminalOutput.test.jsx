import React from 'react';
import { render } from '@testing-library/react';
import TerminalOutput from '../TerminalOutput';

describe('TerminalOutput', () => {
  it('renders the output with a picture', () => {
    const output = {
      output: 'Test output',
      finalOutput: 'Test output',
      picture: '/test.jpg',
    };
    const { getByAltText } = render(<TerminalOutput output={output} />);
    expect(getByAltText('Output')).toBeInTheDocument();
  });

  it('renders the output with a link', () => {
    const output = {
      output: 'Test output',
      finalOutput: 'Test output',
      link: '/test-link',
    };
    const { getByText } = render(<TerminalOutput output={output} />);
    expect(getByText('Click Here')).toBeInTheDocument();
  });

  it('renders the output with a progress bar', () => {
    const output = {
      output: 'Test output',
      finalOutput: 'Test output',
      progress: true,
    };
    const { getByText } = render(<TerminalOutput output={output} />);
    expect(getByText(/Hi. Thanks for visiting my portfolio. Let me get things set up here/)).toBeInTheDocument();
  });
});
