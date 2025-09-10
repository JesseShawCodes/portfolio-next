"use client";
import React, {useState, useEffect, use} from "react";
import Repo from "../components/Repo";

import Link from "next/link";
import Project from "./projects";
import { fetchGitHubData } from "../services/fetchGitHubData";
import { fetchCmsData } from "../services/fetchCmsData";

export default function Page() {
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
          fetchGitHubData("https://api.github.com/users/JesseShawCodes/repos?per_page=100&sort=updated"),
          fetchCmsData(`${process.env.NEXT_PUBLIC_API_URL}/api/repos?populate=*`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=logo`, { cache: 'force-cache' })
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

        const projectsData = await projectsResponse.json();
        setProjects(projectsData.data);
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
  }, []);

  if (isLoadingGithub || isLoadingCms) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Projects</h1>
      <div>
        <p>My time is currently being taken up by my Full Time job at Amentum. But I do wanna make sure I am putting in extra time to keep up with new tools and work on some of my own projects to stay sharp.</p>

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

        <p>If you would like to keep up with all of the other work I am doing outside of my work at Amentum, please check out my GitHub projects below or <Link href="https://github.com/JesseShawCodes" target='_blank'>
            visit my GitHub profile
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
