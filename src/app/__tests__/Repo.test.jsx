import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Repo from '../components/Repo';
import { fetchGitHubData } from '../services/fetchGitHubData';

jest.mock('../services/fetchGitHubData');

const mockRepo = {
  id: 1,
  name: 'test-repo',
  cmsName: 'test-repo',
  html_url: 'https://github.com/test/test-repo',
  language: 'JavaScript',
  description: 'A test repository',
  topics: ['react', 'jest'],
};

describe('Repo component', () => {
  it('renders repository information', async () => {
    render(<Repo repo={mockRepo} />);

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('Repo')).toHaveAttribute('href', 'https://github.com/test/test-repo');
    await waitFor(() => {
      expect(screen.getByText('Language:')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('A test repository')).toBeInTheDocument();
      expect(screen.getByText('Technologies Used:')).toBeInTheDocument();
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('jest')).toBeInTheDocument();
    });
  });

  it('displays loading state and then commits', async () => {
    const mockCommits = [
      {
        sha: '1234567890',
        html_url: 'https://github.com/test/test-repo/commit/1234567890',
        commit: {
          author: {
            date: '2025-09-04T12:34:56Z',
          },
          message: 'Initial commit',
        },
      },
    ];

    fetchGitHubData.mockResolvedValue(mockCommits);

    render(<Repo repo={mockRepo} />);

    expect(screen.getByText('Loading commits...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('123456')).toBeInTheDocument();
    });

    expect(screen.getByText('Initial commit')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    fetchGitHubData.mockRejectedValue(new Error('Failed to fetch'));

    render(<Repo repo={mockRepo} />);

    expect(screen.getByText('Loading commits...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Error loading commits.')).toBeInTheDocument();
    });
  });
});
