import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

const mockFetchGitHubData = jest.fn();

jest.mock('../services/fetchGitHubData', () => ({
  fetchGitHubData: (...args) => mockFetchGitHubData(...args),
}));

import Repo from '../components/Repo';

const mockRepo = {
  name: 'test-repo',
  pinned: true,
  url: 'https://github.com/test/test-repo',
  language: 'JavaScript',
  description: 'A test repository',
  topics: ['react', 'jest'],
};

describe('Repo component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchGitHubData.mockResolvedValue([
      {
        sha: '1234567890abcdef',
        html_url: 'https://github.com/test/test-repo/commit/1234567890abcdef',
        commit: {
          author: { date: '2025-09-04T12:34:56Z' },
          message: 'Initial commit',
        },
      },
    ]);
  });

  it('renders repository information', async () => {
    render(<Repo repo={mockRepo} githubUsername="test" />);

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('Repo')).toHaveAttribute('href', 'https://github.com/test/test-repo');
    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('Technologies Used:')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Initial commit')).toBeInTheDocument();
    });
  });

  it('fetches and displays commits from GitHub', async () => {
    render(<Repo repo={mockRepo} githubUsername="test" />);

    expect(screen.getByText('Loading commits...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Recent Commits:')).toBeInTheDocument();
      expect(screen.getByText('123456')).toBeInTheDocument();
      expect(screen.getByText('Initial commit')).toBeInTheDocument();
    });

    expect(mockFetchGitHubData).toHaveBeenCalledWith(
      'https://api.github.com/repos/test/test-repo/commits?per_page=3'
    );
  });

  it('preserves newlines in commit messages', async () => {
    mockFetchGitHubData.mockResolvedValue([
      {
        sha: 'abcdef1234567890',
        html_url: 'https://github.com/test/test-repo/commit/abcdef1234567890',
        commit: {
          author: { date: '2025-09-04T12:34:56Z' },
          message: 'Subject line\n\n* Bullet one\n* Bullet two',
        },
      },
    ]);

    render(<Repo repo={mockRepo} githubUsername="test" />);

    let message;
    await waitFor(() => {
      message = screen.getByText((_, element) =>
        element?.textContent === 'Subject line\n\n* Bullet one\n* Bullet two'
      );
      expect(message).toBeInTheDocument();
    });

    expect(message).toHaveStyle({ whiteSpace: 'pre-wrap' });
  });

  it('hides commits section when fetch returns no commits', async () => {
    mockFetchGitHubData.mockResolvedValue([]);

    render(<Repo repo={mockRepo} githubUsername="test" />);

    await waitFor(() => {
      expect(screen.queryByText('Loading commits...')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Recent Commits:')).not.toBeInTheDocument();
  });

  it('skips commit fetch when githubUsername is missing', async () => {
    render(<Repo repo={mockRepo} />);

    await waitFor(() => {
      expect(screen.queryByText('Loading commits...')).not.toBeInTheDocument();
    });

    expect(mockFetchGitHubData).not.toHaveBeenCalled();
    expect(screen.queryByText('Recent Commits:')).not.toBeInTheDocument();
  });

  it('skips commit fetch when repo name is missing', async () => {
    render(
      <Repo
        repo={{
          pinned: false,
          url: 'https://github.com/test/unnamed',
        }}
        githubUsername="test"
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading commits...')).not.toBeInTheDocument();
    });

    expect(mockFetchGitHubData).not.toHaveBeenCalled();
    expect(screen.queryByText('Recent Commits:')).not.toBeInTheDocument();
  });

  it('hides commits section when commit fetch fails', async () => {
    mockFetchGitHubData.mockRejectedValue(new Error('GITHUB API ERROR'));

    render(<Repo repo={mockRepo} githubUsername="test" />);

    await waitFor(() => {
      expect(screen.queryByText('Loading commits...')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Recent Commits:')).not.toBeInTheDocument();
  });

  it('hides optional sections when language, description, and topics are missing', async () => {
    mockFetchGitHubData.mockResolvedValue([]);

    render(
      <Repo
        repo={{
          name: 'minimal-repo',
          pinned: false,
          url: 'https://github.com/test/minimal-repo',
        }}
        githubUsername="test"
      />
    );

    expect(screen.getByText('minimal-repo')).toBeInTheDocument();
    expect(screen.queryByText('Language:')).not.toBeInTheDocument();
    expect(screen.queryByText('Technologies Used:')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading commits...')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Recent Commits:')).not.toBeInTheDocument();
  });
});
