"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import TechnologyItem from "../components/TechnologyItem";
import DescriptionContent from "../components/DescriptionContent";
import { formatMyDateDetail } from "../services/services";
import { getLocale } from "../../config/locale";

function Project({project}) {
  const { portfolio } = getLocale();

  return (
    <div className="project card my-4 card-top-border shadow-lg shadow-dark-mode-white">
      <div className="card-header">
        <h2>{project.name}</h2>
        <div><Image src={`${project.logo.url}`} width={80} height={80} alt={`${project.name} logo`} /></div>
      </div>
      <div className="card-body">
        <div>
          <DescriptionContent description={project.description} asParagraphs />
        </div>
        <div className="d-flex flex-column gap-1">
          <Link href={project.link} target="_blank">
            {project.link}
          </Link>
          {project.github ? (
            <Link href={project.github} target="_blank" className="link-underline link-underline-opacity-0">
              <FontAwesomeIcon icon={faGithub} className="me-1" />
              {portfolio.githubRepoLabel}
            </Link>
          ) : null}
        </div>
        {project.updatedAt ? (
          <p className="mt-3 mb-0 text-body-secondary">
            {portfolio.lastUpdatedLabel} {formatMyDateDetail(project.updatedAt)}
          </p>
        ) : null}
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
