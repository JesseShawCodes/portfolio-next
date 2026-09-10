import React from 'react';
import WorkExperienceCard from './WorkExperienceCard';
import DownloadButton from '../components/DownloadButton';
import EducationCard from './EducationCard';
import { getLocale } from '../../config/locale';
import { getCmsEducations, getCmsWorkExperiences } from '../services/cms';

async function ResumePage() {
  const { resume } = getLocale();
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
    <div className="antialiased d-flex flex-column min-vh-100">
      <div className='container'>
        <h1>{resume.heading}</h1>
        <DownloadButton pdfUrl={`https://${process.env.NEXT_PUBLIC_API_ROOT_MEDIA}/${process.env.NEXT_PUBLIC_RESUME_DOWNLOAD}`}/>
        <h2>{resume.workExperience}</h2>
        {
          projects.map((project: Project, index: number) => (
            <WorkExperienceCard key={index} project={project} index={index} />
          ))
        }
        <h2>{resume.education}</h2>
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

async function getProjects() {
  const data = await getCmsWorkExperiences();
  return data.data;
}

async function getEducation() {
  const data = await getCmsEducations();
  return data.data;
}
