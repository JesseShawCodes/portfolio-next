"use client";
import React, { useEffect, useState } from "react";
import Repo from "../components/Repo";
import Link from "next/link";
import Project from "./projects";
import { getLocale } from "../../config/locale";
import { fetchGitHubData } from "../services/fetchGitHubData";

function sortRepos(repos) {
  return [...repos].sort((a, b) => Number(b.pinned) - Number(a.pinned));
}

export default function Page() {
  const { portfolio, site } = getLocale();
  const projects = portfolio.projects;
  const selectedRepos = portfolio.repos;

  const [repositories, setRepositories] = useState([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(true);
  const [isErrorGithub, setIsErrorGithub] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingGithub(true);
        setIsErrorGithub(null);

        const githubFetch = await fetchGitHubData(
          `https://api.github.com/users/${site.githubUsername}/repos?per_page=100&sort=updated`
        );

        const githubRepos = sortRepos(
          githubFetch
            .map((repo) => {
              const selectedRepo = selectedRepos.find(
                (selected) => selected.url === repo.html_url
              );
              if (!selectedRepo) return null;

              return {
                name: selectedRepo.name,
                url: repo.html_url,
                pinned: selectedRepo.pinned,
                language: repo.language,
                description: repo.description,
                topics: repo.topics ?? [],
              };
            })
            .filter(Boolean)
        );

        setRepositories(githubRepos);
      } catch (error) {
        setIsErrorGithub({
          error: true,
          message: error,
        });
      } finally {
        setIsLoadingGithub(false);
      }
    };

    fetchData();
    // selectedRepos comes from static locale config and is stable across renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.githubUsername]);

  if (isLoadingGithub) {
    return <div className="container">{portfolio.loading}</div>;
  }

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
            {isErrorGithub ? (
              <div>
                <p>{isErrorGithub.message.message}</p>
              </div>
            ) : (
              repositories.map((repository) => (
                <Repo
                  repo={repository}
                  githubUsername={site.githubUsername}
                  key={repository.name}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
