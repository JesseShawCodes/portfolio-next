import React from 'react';
import { render, screen } from '@testing-library/react';
import Project from '../portfolio/projects';

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
});
