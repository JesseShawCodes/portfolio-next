import React from 'react';
import PropTypes from 'prop-types';

async function ResumePage({ pageHeading = 'This is the Resume page', pageContent = 'sfsafs' }) {
  const projects = await getProjects();
  return (
    <div className="bg-gradient-my-gradient d-flex flex-column min-vh-100">
      <div className='container'>
        <h1>
          {pageHeading}
        </h1>
        <p>
          {pageContent}
        </p>
        {
          projects.map((project, index) => (
            <div className='card'>
              <h2>{project.title}</h2>
              <h2>{project.company}</h2>
              <div>
                {project.description}
              </div>
            </div>
          ))
        }
        <div>
          {projects[0].company}
        </div>
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/work-experiences`, {
    cache: 'force-cache',
  }) 

  const data = await res.json();
  return data.data;
}
