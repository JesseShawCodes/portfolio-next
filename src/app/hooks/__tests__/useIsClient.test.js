import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { useIsClient } from '../useIsClient';

function Probe() {
  const isClient = useIsClient();
  return <span data-testid="is-client">{String(isClient)}</span>;
}

describe('useIsClient', () => {
  it('returns true after client hydration', () => {
    render(<Probe />);
    expect(screen.getByTestId('is-client')).toHaveTextContent('true');
  });

  it('returns false during SSR', () => {
    const html = renderToString(<Probe />);
    expect(html).toContain('false');
  });
});
