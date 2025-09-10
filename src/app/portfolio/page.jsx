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

  // Git Hub API.
  useEffect(() => {
    (async () => {
      try {
        setIsLoadingGithub(true);
        const githubFetch = await fetchGitHubData("https://api.github.com/users/JesseShawCodes/repos?per_page=100&sort=updated");
        const selectedRepos = await fetchCmsData(`${process.env.NEXT_PUBLIC_API_URL}/api/repos?populate=*`);
        const githubRepos = githubFetch.map((repo) => {
          const keyExists = selectedRepos.data.some((selectedRepo) => selectedRepo.url === repo.html_url);
          const newName = selectedRepos.data.find((selectedRepo) => repo.html_url === selectedRepo.url);
          return { ...repo, isSelected: keyExists, cmsName: newName ? newName.name : null};
        }).filter(obj => obj.isSelected);
        setRepositories(githubRepos);
      } catch (error) {
        setIsErrorGithub({
          error: true,
          message: error,
        });
      } finally {
        setIsLoadingGithub(false);
      }
    })();
  }, []);

  // Portfolio CMS API.
  useEffect(() => {
    (async () => {
      try {
        setIsLoadingCms(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=logo`, {
          cache: 'force-cache',
        });

        const data = await res.json();
        setProjects(data.data);
      } catch (error) {
        setIsErrorCms({
          error: true,
          message: error,
        });
      } finally {
        setIsLoadingCms(false);
      }
    })();
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
