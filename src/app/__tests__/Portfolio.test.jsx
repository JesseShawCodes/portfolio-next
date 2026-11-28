import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

const mockFetchGitHubData = jest.fn();

jest.mock('../services/fetchGitHubData', () => ({
  fetchGitHubData: (...args) => mockFetchGitHubData(...args),
}));

jest.mock('../../config/locale', () => ({
  getLocale: () => ({
    site: {
      githubUsername: 'TestUser',
    },
    portfolio: {
      heading: 'Projects',
      intro: 'Intro text',
      githubPrompt: 'Check out my GitHub',
      githubLinkText: 'visit my GitHub profile',
      loading: 'Loading...',
      githubRepoLabel: 'GitHub',
      lastUpdatedLabel: 'Last updated',
      projects: [
        {
          name: 'Mock Project',
          description: 'A mock project',
          link: 'https://example.com',
          github: 'https://github.com/TestUser/mock-project',
          logo: { url: '/logo.png' },
          technologies: [],
        },
      ],
      repos: [
        {
          name: 'unpinned-first',
          url: 'https://github.com/TestUser/unpinned-first',
          pinned: false,
        },
        {
          name: 'pinned-second',
          url: 'https://github.com/TestUser/pinned-second',
          pinned: true,
        },
        {
          name: 'also-pinned',
          url: 'https://github.com/TestUser/also-pinned',
          pinned: true,
        },
      ],
    },
  }),
}));

jest.mock('../components/Repo', () => {
  return function MockRepo({ repo }) {
    return <h3>{repo.name}</h3>;
  };
});

import Page from '../portfolio/page';

describe('Portfolio Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchGitHubData.mockResolvedValue([
      {
        name: 'unpinned-first',
        html_url: 'https://github.com/TestUser/unpinned-first',
        language: 'JavaScript',
        description: 'desc',
        topics: [],
      },
      {
        name: 'pinned-second',
        html_url: 'https://github.com/TestUser/pinned-second',
        language: 'JavaScript',
        description: 'desc',
        topics: [],
      },
      {
        name: 'also-pinned',
        html_url: 'https://github.com/TestUser/also-pinned',
        language: 'JavaScript',
        description: 'desc',
        topics: [],
      },
      {
        name: 'not-selected',
        html_url: 'https://github.com/TestUser/not-selected',
        language: 'JavaScript',
        description: 'desc',
        topics: [],
      },
      {
        name: 'mock-project',
        html_url: 'https://github.com/TestUser/mock-project',
        language: 'TypeScript',
        description: 'project desc',
        topics: [],
        pushed_at: '2026-11-20T12:00:00Z',
        updated_at: '2026-11-19T12:00:00Z',
      },
    ]);
  });

  it('renders the portfolio page with projects and repos', async () => {
    render(<Page />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    expect(screen.getByText('Mock Project')).toBeInTheDocument();
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/TestUser/mock-project'
    );
    expect(screen.getByText(/Last updated/)).toBeInTheDocument();
    expect(screen.getByText(/November 20, 2026/)).toBeInTheDocument();
    expect(screen.getByText('pinned-second')).toBeInTheDocument();
    expect(screen.queryByText('not-selected')).not.toBeInTheDocument();
  });

  it('sorts pinned repositories before unpinned ones', async () => {
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('pinned-second')).toBeInTheDocument();
    });

    const headings = screen.getAllByRole('heading', { level: 3 });
    const repoNames = headings.map((heading) => heading.textContent);

    expect(repoNames.indexOf('pinned-second')).toBeLessThan(repoNames.indexOf('unpinned-first'));
    expect(repoNames.indexOf('also-pinned')).toBeLessThan(repoNames.indexOf('unpinned-first'));
  });

  it('shows an error message when GitHub fetch fails', async () => {
    mockFetchGitHubData.mockRejectedValueOnce(new Error('GITHUB API ERROR'));

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('GITHUB API ERROR')).toBeInTheDocument();
    });
  });

  it('defaults missing topics to an empty array', async () => {
    mockFetchGitHubData.mockResolvedValue([
      {
        name: 'pinned-second',
        html_url: 'https://github.com/TestUser/pinned-second',
        language: 'JavaScript',
        description: 'desc',
      },
    ]);

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('pinned-second')).toBeInTheDocument();
    });
  });

  it('matches selected repos case-insensitively by URL', async () => {
    mockFetchGitHubData.mockResolvedValue([
      {
        name: 'Unpinned-First',
        html_url: 'https://github.com/TestUser/Unpinned-First',
        language: 'JavaScript',
        description: 'desc',
        topics: [],
      },
    ]);

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('unpinned-first')).toBeInTheDocument();
    });
  });
});
