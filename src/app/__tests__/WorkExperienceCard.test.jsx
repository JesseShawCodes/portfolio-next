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
});
