import React from 'react';
import { render, screen } from '@testing-library/react';
import Repo from '../components/Repo';

const mockRepo = {
  name: 'test-repo',
  pinned: true,
  url: 'https://github.com/test/test-repo',
  language: 'JavaScript',
  description: 'A test repository',
  topics: ['react', 'jest'],
  commits: [
    {
      sha: '1234567890abcdef',
      url: 'https://github.com/test/test-repo/commit/1234567890abcdef',
      date: '2025-09-04T12:34:56Z',
      message: 'Initial commit',
    },
  ],
};

describe('Repo component', () => {
  it('renders repository information', () => {
    render(<Repo repo={mockRepo} />);

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('Repo')).toHaveAttribute('href', 'https://github.com/test/test-repo');
    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('Technologies Used:')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
  });

  it('displays commits from repo data', () => {
    render(<Repo repo={mockRepo} />);

    expect(screen.getByText('Recent Commits:')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
    expect(screen.getByText('Initial commit')).toBeInTheDocument();
  });

  it('hides commits section when there are no commits', () => {
    render(<Repo repo={{ ...mockRepo, commits: [] }} />);

    expect(screen.queryByText('Recent Commits:')).not.toBeInTheDocument();
  });
});
