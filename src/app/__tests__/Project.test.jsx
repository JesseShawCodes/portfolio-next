import React from 'react';
import { render, screen } from '@testing-library/react';
import Project from '../portfolio/projects';

jest.mock('../../config/locale', () => ({
  getLocale: () => ({
    portfolio: {
      githubRepoLabel: 'GitHub',
      lastUpdatedLabel: 'Last updated',
    },
  }),
}));

describe('Project', () => {
  it('renders a project with no technologies', () => {
    const project = {
      name: 'Test Project',
      logo: { url: '/test.png' },
      description: 'A test project',
      link: '/test-link',
      technologies: [],
    };

    render(<Project project={project} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project')).toBeInTheDocument();
    expect(screen.getByText('/test-link')).toBeInTheDocument();
  });

  it('renders technology groups and items', () => {
    const project = {
      name: 'Dadgad',
      logo: { url: '/dadgad.png' },
      description: ['Line one', 'Line two'],
      link: 'https://dadgad.example',
      technologies: [
        { title: 'Frontend', list: ['React', 'Next.js'] },
        { title: 'Backend', list: ['Django'] },
      ],
    };

    render(<Project project={project} />);

    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Django')).toBeInTheDocument();
    expect(screen.getByText('Line one')).toBeInTheDocument();
  });

  it('renders a GitHub link and last updated date when provided', () => {
    const project = {
      name: 'PixelBloom',
      logo: { url: '/bloom.png' },
      description: 'Generative art',
      link: 'https://pixel-bloom.example',
      github: 'https://github.com/JesseShawCodes/generative-art-app',
      updatedAt: '2026-11-26T20:29:38Z',
      technologies: [],
    };

    render(<Project project={project} />);

    const githubLink = screen.getByText('GitHub');
    expect(githubLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/JesseShawCodes/generative-art-app'
    );
    expect(screen.getByText(/Last updated/)).toBeInTheDocument();
    expect(screen.getByText(/November 26, 2026/)).toBeInTheDocument();
  });
});
