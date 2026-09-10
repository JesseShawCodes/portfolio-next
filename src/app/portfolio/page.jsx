"use client";
import React, {useState, useEffect, use} from "react";
import Repo from "../components/Repo";

import Link from "next/link";
import Project from "./projects";
import { fetchGitHubData } from "../services/fetchGitHubData";
import { getCmsRepos, getCmsProjects } from "../services/cms";
import { getLocale } from "../../config/locale";

export default function Page() {
  const { portfolio, site } = getLocale();
  const [repositories, setRepositories] = useState([]);
  const [projects, setProjects] = useState([]);

  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isErrorGithub, setIsErrorGithub] = useState(false);

  const [isLoadingCms, setIsLoadingCms] = useState(false);
  const [isErrorCms, setIsErrorCms] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingGithub(true);
        setIsLoadingCms(true);

        const [githubFetch, selectedRepos, projectsResponse] = await Promise.all([
          fetchGitHubData(`https://api.github.com/users/${site.githubUsername}/repos?per_page=100&sort=updated`),
          getCmsRepos(),
          getCmsProjects(),
        ]);

        const githubRepos = githubFetch
          .map((repo) => {
            const selectedRepo = selectedRepos.data.find((selectedRepo) => selectedRepo.url === repo.html_url);
            return {
              ...repo,
              isSelected: !!selectedRepo,
              isPinned: selectedRepo ? selectedRepo.pinned : null,
              cmsName: selectedRepo ? selectedRepo.name : null,
            };
          })
          .filter((obj) => obj.isSelected)
          .sort((a, b) => {
            const aPinned = selectedRepos.data.find((d) => d.name === a.cmsName)?.pinned || false;
            const bPinned = selectedRepos.data.find((d) => d.name === b.cmsName)?.pinned || false;

            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;
          });

        setRepositories(githubRepos);

        setProjects(projectsResponse.data);
      } catch (error) {
        setIsErrorGithub({
          error: true,
          message: error,
        });
        setIsErrorCms({
          error: true,
          message: error,
        });
      } finally {
        setIsLoadingGithub(false);
        setIsLoadingCms(false);
      }
    };

    fetchData();
  }, [site.githubUsername]);

  if (isLoadingGithub || isLoadingCms) {
    return <div className="container">{portfolio.loading}</div>;
  }

  return (
    <div className="container">
      <h1>{portfolio.heading}</h1>
      <div>
        <p>{portfolio.intro}</p>

          <div>
            {
              isErrorCms
                ? (
                  <div>
                    <p>
                      {isErrorCms.message.message}
                    </p>
                  </div>
                )
                : (
                  projects.map(
                    (project, index) => <Project project={project} key={index} />,
                  )
                )
            }
          </div>

        <p>{portfolio.githubPrompt} <Link href={`https://github.com/${site.githubUsername}`} target='_blank'>
            {portfolio.githubLinkText}
        </Link>.</p>
        <div style={{ maxWidth: '1200px', margin: '0px auto' }}>
          <div>
            {
              isErrorGithub
                ? (
                  <div>
                    <p>
                      {isErrorGithub.message.message}
                    </p>
                  </div>
                )
                : (
                  repositories.map(
                    (repository) => <Repo repo={repository} key={crypto.randomUUID()} />,
                  )
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
