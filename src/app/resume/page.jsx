import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

async function ResumePage({ pageHeading = 'This is the Resume page', pageContent = 'sfsafs' }) {
  const projects = await getProjects();
  console.log(projects[0].logo[0].url);
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
            <div className='card' key={`project-${index}`}>
              <div className='card-header bg-teal'>
                <h2>{project.title}</h2>
                <h3>{project.company}</h3>
                <h4>{project.startdate} - {project.enddate}</h4>
                <Image src={project.logo[0].url} width={200} height={100} alt={'Amentum Logo'}/>
              </div>

              <div className="card-body p-6">
                {project.description}
              </div>
              {/*
              footer section to be added
              <div class="card-footer text-center">
                <p>Technologies Used:</p>
              </div>
              */}
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/work-experiences?populate=logo`, {
    cache: 'force-cache',
  }) 

  const data = await res.json();
  return data.data;
}
