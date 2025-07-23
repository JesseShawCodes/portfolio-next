import Image from "next/image";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import TechnologyItem from "../components/TechnologyItem";
import formatMyDate from "../services/services";

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
        <h4>{formatMyDate(project.startdate)} - {project.enddate ? formatMyDate(project.enddate) : "Present"}</h4>

        {
          project.logo ?
          <div style={{'maxWidth': '200px', 'position': 'relative', 'height': '100px'}}>
          <Image 
            src={project.logo[0].url} 
            alt={`${project.company} Logo`}
            fill
            style={{ objectFit: 'contain' }}
          />
          </div>
          :
          null
        }
      </div>

      <div className="card-body p-6">
        <BlocksRenderer content={content} />
      </div>
      {
        project.technologies ?
        <div className="card-footer text-center">
          <p>Technologies Used:</p>
          {
          project.technologies.map((item, index) => {
            return <TechnologyItem name={item} key={`technology-${project.name}-${index}`} />
          })
          }
        </div>
        :
        null
      }
    </div>
  )
}

export default WorkExperienceCard;