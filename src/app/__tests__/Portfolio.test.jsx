import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../portfolio/page';

// Refactor mock data into separate variables for clarity
const mockCmsData = {
  data: [
    {
      id: 4,
      documentId: "lhn7fg5dqn8c5ly29ra0x912",
      name: "Test Repo 1",
      createdAt: "2025-09-10T02:29:28.277Z",
      updatedAt: "2025-09-10T02:29:59.143Z",
      publishedAt: "2025-09-10T02:29:59.154Z",
      pinned: true,
      url: 'https://github.com/test/repo1'
    },
    {
      id: 5,
      documentId: "ddddsdgagsdmg",
      name: "Test Repo 2",
      createdAt: "2025-09-10T02:29:28.277Z",
      updatedAt: "2025-09-10T02:29:59.143Z",
      publishedAt: "2025-09-10T02:29:59.154Z",
      pinned: true,
      url: 'https://github.com/test/repo2'
    }
  ]
}

const mockGitHubData = [
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
];

const mockProjectData = {
  data: [
    {
      name: 'Test Project 1',
      description: 'Test description 1',
      link: 'https://test.com/project1',
      logo: { url: 'https://test.com/logo.png' },
      technologies: [
        {
          "list": ["JavaScript", "Python"],
          "title": "Languages"
        },
        {
          "list": ["React", "NextJS", "Django"],
          "title": "Frameworks"
        },
        {
          "list": ["Celery", "MySQL", "P5JS"],
          "title": "Other Technologies"
        }
      ],
    },
  ],
};

jest.mock('react-markdown', () => (props) => {
  return <>{props.children}</>;
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProjectData),
  })
);

jest.mock('../services/fetchGitHubData', () => ({
  fetchGitHubData: jest.fn(() => Promise.resolve(mockGitHubData)),
}));

jest.mock("../services/fetchCmsData", () => ({
  fetchCmsData: jest.fn(() => Promise.resolve(mockCmsData))
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
