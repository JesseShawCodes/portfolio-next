import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkExperienceCard from '../resume/WorkExperienceCard';

describe('WorkExperienceCard', () => {
  it('renders a work experience card with no end date, no logo, and no secondary technologies', () => {
    const project = {
      title: 'Test Title',
      company: 'Test Company',
      startdate: '2022-01-01',
      description: 'Test description',
      technologies: ['React'],
    };

    render(<WorkExperienceCard project={project} index={0} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText(/Present/i)).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders logo, end date, and primary/secondary technologies', () => {
    const project = {
      title: 'Senior Engineer',
      company: 'Acme',
      name: 'acme-role',
      startdate: '2022-01-01',
      enddate: '2023-06-01',
      description: ['Built things', 'Shipped features'],
      logo: [{ url: '/acme-logo.png' }],
      technologies: ['React', 'TypeScript'],
      secondarytechnologies: ['GraphQL'],
    };

    render(<WorkExperienceCard project={project} index={1} />);

    expect(screen.getByAltText('Acme Logo')).toBeInTheDocument();
    expect(screen.getByText('Built things')).toBeInTheDocument();
    expect(screen.getByText('Shipped features')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.queryByText(/Present/i)).not.toBeInTheDocument();
  });

  it('omits the technologies footer when technologies are missing', () => {
    const project = {
      title: 'Intern',
      company: 'Startup',
      startdate: '2020-01-01',
      enddate: '2020-06-01',
      description: 'Helped out',
    };

    render(<WorkExperienceCard project={project} index={2} />);

    expect(screen.queryByText('Primary Technologies:')).not.toBeInTheDocument();
    expect(screen.queryByText('Secondary Technologies:')).not.toBeInTheDocument();
  });
});
