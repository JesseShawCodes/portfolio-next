import React from 'react';
import PropTypes from 'prop-types';
import WorkExperienceCard from './WorkExperienceCard';
import DownloadButton from '../components/DownloadButton';

async function ResumePage({ pageHeading = 'Resume' }) {
  const projects = await getProjects();
  projects.sort((a, b) =>  b.startdate.localeCompare(a.startdate));

  return (
    <div className="antialiased bg-gradient-my-gradient d-flex flex-column min-vh-100">

      <div className='container'>
        <h1>
          {pageHeading}
        </h1>
        <DownloadButton pdfUrl='/JesseShaw_Resume.pdf'/>
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
