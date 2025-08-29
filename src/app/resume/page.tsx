import React from 'react';
import PropTypes from 'prop-types';
import WorkExperienceCard from './WorkExperienceCard';
import DownloadButton from '../components/DownloadButton';
import EducationCard from './EducationCard';
import { getRenderResumeDataCache } from 'next/dist/server/app-render/work-unit-async-storage.external';

async function ResumePage({ pageHeading = 'Resume' }) {
  interface Project {
    name: string,
    startdate: string,
    enddate: string
  }

  interface Education {
    schoolName: string;
    degree: string;
    startDate: string;
    field: string;
    endDate: string
  }

  const projects = await getProjects();
  if (projects.length > 0) {
    projects.sort((a: Project, b: Project) =>  b.startdate.localeCompare(a.startdate));
  }

  const education = await getEducation();
  if (education) {
    education.sort((a: Education, b: Education) =>  b.startDate.localeCompare(a.startDate));
  }

  return (
    <div className="antialiased bg-gradient-my-gradient d-flex flex-column min-vh-100">
      <div className='container'>
        <h1>{pageHeading}</h1>
        <DownloadButton pdfUrl={`https://${process.env.NEXT_PUBLIC_API_ROOT_MEDIA}/${process.env.NEXT_PUBLIC_RESUME_DOWNLOAD}`}/>
        <h2>Work Experience</h2>
        {
          projects.map((project: Project, index: number) => (
            <WorkExperienceCard key={index} project={project} index={index} />
          ))
        }
        <h2>Education</h2>
        {
          // Change 'object' to the correct Education type
          education.map((edu: Education, index: number) => (
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
