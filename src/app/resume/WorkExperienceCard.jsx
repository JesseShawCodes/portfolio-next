import Image from "next/image";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

function WorkExperienceCard({ project, index }) {
  const content = [
    {
      type: 'list',
      children: [{ type: 'text', text: project.description }],
    },
  ];
  return (
    <div className='card my-4' key={`project-${index}`}>
      <div className='card-header bg-card-header text-white'>
        <h2>{project.title}</h2>
        <h3>{project.company}</h3>
        <h4>{project.startdate} - {project.enddate ? project.enddate : "Present"}</h4>
        <div style={{'maxWidth': '200px', 'position': 'relative', 'height': '100px'}}>
        {
          project.logo ?
          <Image 
            src={project.logo[0].url} 
            alt={`${project.company} Logo`}
            fill
            style={{ objectFit: 'contain' }}
          />
          :
          null
        }
        </div>
      </div>

      <div className="card-body p-6">
        <BlocksRenderer content={content} />
      </div>
      {/*
      footer section to be added
      <div class="card-footer text-center">
        <p>Technologies Used:</p>
      </div>
      */}
    </div>
  )
}

export default WorkExperienceCard;