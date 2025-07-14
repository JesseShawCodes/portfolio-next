import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import WorkExperienceCard from './WorkExperienceCard';

async function ResumePage({ pageHeading = 'This is the Resume page', pageContent = 'sfsafs' }) {


  const projects = await getProjects();

  return (
    <div className="antialiased bg-gradient-my-gradient d-flex flex-column min-vh-100">
      <div className='container'>
        <h1>
          {pageHeading}
        </h1>
        <p>
          {pageContent}
        </p>
        {
          projects.map((project, index) => (
            <WorkExperienceCard key={index} project={project} index={index} />
          ))
        }
      </div>
    </div>
  );
}

export default ResumePage;

ResumePage.propTypes = {
  pageHeading: PropTypes.string,
  pageContent: PropTypes.string,
};

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/work-experiences?populate=logo`, {
    cache: 'force-cache',
  }) 

  const data = await res.json();
  return data.data;
}
