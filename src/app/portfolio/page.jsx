import React from "react";
import Repo from "../components/Repo";
import Link from "next/link";
import Project from "./projects";
import cmsMock from "../../config/cms-mock.json";
import { getLocale } from "../../config/locale";

function sortRepos(repos) {
  return [...repos].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
}

export default function Page() {
  const { portfolio, site } = getLocale();
  const projects = cmsMock.projects.data;
  const repositories = sortRepos(cmsMock.repos.data);

  return (
    <div className="container">
      <h1>{portfolio.heading}</h1>
      <div>
        <p>{portfolio.intro}</p>

        <div>
          {projects.map((project, index) => (
            <Project project={project} key={index} />
          ))}
        </div>

        <p>
          {portfolio.githubPrompt}{" "}
          <Link href={`https://github.com/${site.githubUsername}`} target="_blank">
            {portfolio.githubLinkText}
          </Link>
          .
        </p>
        <div style={{ maxWidth: "1200px", margin: "0px auto" }}>
          <div>
            {repositories.map((repository) => (
              <Repo repo={repository} key={repository.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
