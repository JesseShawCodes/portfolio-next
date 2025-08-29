"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import TechnologyItem from "../components/TechnologyItem";

function Project({project}) {
  return (
    <div className="project card my-4">
      <div className="card-header">
        <h2>{project.name}</h2>
        <div><Image src={`${project.logo.url}`} width={80} height={80} alt={`${project.name} logo`} /></div>
      </div>
      <div className="card-body">
        <div>
          <ReactMarkdown>
          {project.description}
          </ReactMarkdown>
        </div>
        <div>
          <Link href={project.link} target="_blank">
          {project.link}
          </Link>
        </div>
      </div>
      <div className="card-footer text-center user-select-none">
        <>
          <div className="row text-center">
            {
              project.technologies.length > 0 ? 
              project.technologies.map((tech, index) => (
                <div className="col-md-4 mb-3 mb-md-0" key={`${project.name}-${tech}-${index}`}>
                  <h4>{tech.title}</h4>
                  {tech.list.map((item, index) => {
                    return <TechnologyItem key={index} name={item} />  
                  })}
                </div>
              ))
              : null
            }
          </div>
        </>
      </div>
    </div>
  );
}

export default Project;
