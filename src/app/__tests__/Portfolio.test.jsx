
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../portfolio/page';
import { fetchGitHubData } from '../services/fetchGitHubData';

jest.mock('react-markdown', () => (props) => {
  return <>{props.children}</>;
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [
          {
            name: 'Test Project 1',
            description: 'Test description 1',
            link: 'https://test.com/project1',
            logo: { url: 'https://test.com/logo.png' },
            technologies: [
                {
                    "list": [
                        "JavaScript",
                        "Python"
                    ],
                    "title": "Languages"
                },
                {
                    "list": [
                        "React",
                        "NextJS",
                        "Django"
                    ],
                    "title": "Frameworks"
                },
                {
                    "list": [
                        "Celery",
                        "MySQL",
                        "P5JS"
                    ],
                    "title": "Other Technologies"
                }
            ],
          },
        ],
      }),
  })
);

jest.mock('../services/fetchGitHubData', () => ({
  fetchGitHubData: jest.fn(() =>
    Promise.resolve(
        [
          {
            name: 'Test Repo 1',
            description: 'Test description 1',
            html_url: 'https://github.com/test/repo1',
            topics: [],
          },
          {
            name: 'Test Repo 2',
            description: 'Test description 2',
            html_url: 'https://github.com/test/repo2',
            topics: [],
          },
        ],
    )
  ),
}));

describe('Portfolio Page', () => {
  it('should render the page heading', async () => {
    render(<Page />);
    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: /projects/i });
      expect(heading).toBeInTheDocument();
    });
  });

  it('should render a list of projects and repositories', async () => {
    render(<Page />);
    await waitFor(() => {
      const projectHeading = screen.getByRole('heading', { name: /Test Project 1/i });
      const repoHeading = screen.getByRole('heading', { name: /Test Repo 1/i });
      expect(projectHeading).toBeInTheDocument();
      expect(repoHeading).toBeInTheDocument();
    });
  });
});
