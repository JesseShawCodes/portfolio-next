import React from 'react';
import PropTypes from 'prop-types';
import WorkExperienceCard from './WorkExperienceCard';
import DownloadButton from '../components/DownloadButton';
import EducationCard from './EducationCard';

async function ResumePage({ pageHeading = 'Resume' }) {
  const projects = await getProjects();
  if (projects.length > 0) {
    projects.sort((a, b) =>  b.startdate.localeCompare(a.startdate));
  }

  const education = await getEducation();
  if (education) {
    education.sort((a, b) =>  b.startDate.localeCompare(a.startDate));
  }
  return (
    <div className="antialiased bg-gradient-my-gradient d-flex flex-column min-vh-100">

      <div className='container'>
        <h1>
          {pageHeading}
        </h1>
        <DownloadButton pdfUrl='/JesseShaw_Resume.pdf'/>
        <h2>Work Experience</h2>
        {
          projects.map((project, index) => (
            <WorkExperienceCard key={index} project={project} index={index} />
          ))
        }
        <h2>Education</h2>
        {
          education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
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

async function getEducation() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/educations`, {
    cache: 'force-cache',
  });

  const data = await res.json();
  return data.data;
}
