"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatMyDateDetail } from "../services/services";
import TechnologyItem from "./TechnologyItem";
import { fetchGitHubData } from "../services/fetchGitHubData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Repo({ repo, githubUsername }) {
  const topics = repo.topics ?? [];
  const canFetch = Boolean(githubUsername && repo.name);
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(canFetch);

  useEffect(() => {
    if (!canFetch) {
      return;
    }

    const fetchCommits = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubData(
          `https://api.github.com/repos/${githubUsername}/${repo.name}/commits?per_page=3`
        );

        setCommits(
          data.map((commit) => ({
            sha: commit.sha,
            url: commit.html_url,
            date: commit.commit?.author?.date,
            message: commit.commit?.message,
          }))
        );
      } catch {
        setCommits([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommits();
  }, [canFetch, githubUsername, repo.name]);

  return (
    <section className="card my-4 mx-3 p-3 card-top-border shadow-lg shadow-dark-mode-white">
      <h3>
        {repo.pinned ? <FontAwesomeIcon icon={faMapPin} /> : null}
        {repo.name}
      </h3>
      <h4 className="my-2">
        <Link target="_blank" href={repo.url} className="link-underline link-underline-opacity-0">
          <FontAwesomeIcon icon={faGithub} />
          Repo
        </Link>
      </h4>

      {repo.language ? (
        <p>
          <span className="fw-bold">Language: </span>
          {repo.language}
        </p>
      ) : null}
      {repo.description ? <p>{repo.description}</p> : null}
      {topics.length ? (
        <div className="mb-4">
          <p>Technologies Used:</p>
          <div>
            {topics.map((topic) => <TechnologyItem key={topic} name={topic} />)}
          </div>
        </div>
      ) : null}
      {isLoading ? (
        <div>
          <h4>Recent Commits:</h4>
          <p>Loading commits...</p>
        </div>
      ) : null}
      {!isLoading && commits.length ? (
        <div>
          <h4>Recent Commits:</h4>
          <ul className="p-0">
            {commits.map((commit) => (
              <li key={commit.sha} className="list-unstyled d-flex flex-column card border-0 my-2 pb-2">
                <h5 className="d-flex flex-row justify-content-between">
                  <Link
                    href={commit.url}
                    target="_blank"
                    className="text-blue-500 hover:underline link-underline link-underline-opacity-0"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    {commit.sha.slice(0, 6)}
                  </Link>
                  {formatMyDateDetail(commit.date)}
                </h5>
                <div>{commit.message}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
