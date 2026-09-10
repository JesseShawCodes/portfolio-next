import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Page from '../portfolio/page';
import { fetchGitHubData } from '../services/fetchGitHubData';
import { getCmsRepos, getCmsProjects } from '../services/cms';

jest.mock('../services/fetchGitHubData');
jest.mock('../services/cms');

describe('Portfolio Page', () => {

  it('renders the portfolio page with projects and repos', async () => {
    fetchGitHubData.mockResolvedValue([]);
    getCmsRepos.mockResolvedValue({ data: [] });
    getCmsProjects.mockResolvedValue({ data: [] });

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
  });

  it('handles error when fetching github data', async () => {
    fetchGitHubData.mockRejectedValue({ message: 'Failed to fetch github data' });
    getCmsRepos.mockResolvedValue({ data: [] });
    getCmsProjects.mockResolvedValue({ data: [] });

    render(<Page />);

    await waitFor(() => {
      expect(screen.getAllByText('Failed to fetch github data')[0]).toBeInTheDocument();
    });
  });

  it('handles error when fetching cms data', async () => {
    fetchGitHubData.mockResolvedValue([]);
    getCmsRepos.mockRejectedValue({ message: 'Failed to fetch cms data' });
    getCmsProjects.mockResolvedValue({ data: [] });

    render(<Page />);

    await waitFor(() => {
      expect(screen.getAllByText('Failed to fetch cms data')[0]).toBeInTheDocument();
    });
  });
});
