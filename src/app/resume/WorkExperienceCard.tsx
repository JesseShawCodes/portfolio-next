import React from "react";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import TechnologyItem from "../components/TechnologyItem";
import formatMyDate from "../services/services";

function WorkExperienceCard({ project, index }) {
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
        <ReactMarkdown>
          {project.description}
        </ReactMarkdown>
      </div>
      {
        project.technologies ?
        <div className="card-footer text-center user-select-none">
          <div className="my-2">
            <h4 title="Core tools and frameworks I used daily in this role to build, maintain, or ship products.">Primary Technologies:</h4>
            {
              project.technologies.map((item, index) => {
                return <TechnologyItem name={item} key={`technology-${project.name}-${index}`} />
              })
            }
          </div>
          {
            project.secondarytechnologies ? 
            <div className="my-2">
              <h4 title="Supplementary tools I interacted with occasionally or supported through integration, maintenance, or collaboration.">Secondary Technologies:</h4>
              {
                project.secondarytechnologies.map((item, index) => {
                  return <TechnologyItem name={item} key={`technology-${project.name}-${index}`} />
                })
              }
            </div>
            : 
            null
          }
        </div>
        :
        null
      }
    </div>
  )
}

export default WorkExperienceCard;
