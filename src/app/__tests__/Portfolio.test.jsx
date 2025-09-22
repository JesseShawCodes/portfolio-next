import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Page from '../portfolio/page';
import { fetchGitHubData } from '../services/fetchGitHubData';
import { fetchCmsData } from '../services/fetchCmsData';

jest.mock('../services/fetchGitHubData');
jest.mock('../services/fetchCmsData');

describe('Portfolio Page', () => {

  it('renders the portfolio page with projects and repos', async () => {
    fetchGitHubData.mockResolvedValue([]);
    fetchCmsData.mockResolvedValue({ data: [] });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
  });

  it('handles error when fetching github data', async () => {
    fetchGitHubData.mockRejectedValue({ message: 'Failed to fetch github data' });
    fetchCmsData.mockResolvedValue({ data: [] });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );

    render(<Page />);

    await waitFor(() => {
      expect(screen.getAllByText('Failed to fetch github data')[0]).toBeInTheDocument();
    });
  });

  it('handles error when fetching cms data', async () => {
    fetchGitHubData.mockResolvedValue([]);
    fetchCmsData.mockRejectedValue({ message: 'Failed to fetch cms data' });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );

    render(<Page />);

    await waitFor(() => {
      expect(screen.getAllByText('Failed to fetch cms data')[0]).toBeInTheDocument();
    });
  });
});
