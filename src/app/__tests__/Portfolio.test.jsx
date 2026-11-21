import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../../config/content.json', () => ({
  projects: {
    data: [
      {
        name: 'Mock Project',
        description: 'A mock project',
        link: 'https://example.com',
        logo: { url: '/logo.png' },
        technologies: [],
      },
    ],
  },
  repos: {
    data: [
      {
        name: 'unpinned-first',
        pinned: false,
        url: 'https://github.com/test/unpinned-first',
        description: 'desc',
        language: 'JavaScript',
        topics: [],
        commits: [],
      },
      {
        name: 'pinned-second',
        pinned: true,
        url: 'https://github.com/test/pinned-second',
        description: 'desc',
        language: 'JavaScript',
        topics: [],
        commits: [],
      },
      {
        name: 'also-pinned',
        pinned: true,
        url: 'https://github.com/test/also-pinned',
        description: 'desc',
        language: 'JavaScript',
        topics: [],
        commits: [],
      },
    ],
  },
}));

import Page from '../portfolio/page';

describe('Portfolio Page', () => {
  it('renders the portfolio page with projects and repos', () => {
    render(<Page />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Mock Project')).toBeInTheDocument();
  });

  it('sorts pinned repositories before unpinned ones', () => {
    render(<Page />);

    const headings = screen.getAllByRole('heading', { level: 3 });
    const repoNames = headings.map((heading) => heading.textContent);

    expect(repoNames.indexOf('pinned-second')).toBeLessThan(repoNames.indexOf('unpinned-first'));
    expect(repoNames.indexOf('also-pinned')).toBeLessThan(repoNames.indexOf('unpinned-first'));
  });
});
