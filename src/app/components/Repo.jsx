"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchGitHubData } from '../services/fetchGitHubData';

export default function Repo(repository) {
  const { repo } = repository;
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Git Hub API.
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const data = await fetchGitHubData(`https://api.github.com/repos/JesseShawCodes/${repo.name}/commits?per_page=3&sort=updated`);
        
        setCommits(data);
      } catch (error) {
        setIsError({
          error: true,
          message: error,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <section className="card my-4 mx-3 p-3 card-top-border shadow-lg" key={repo.id}>
      <h3>{repo.name}</h3>
      <div className='my-2'>
        <Link target="_blank" href={repo.html_url}>Repo</Link>
      </div>
      <p>
        <span className='fw-bold'>Updated At: </span>
        {repo.updated_at}
      </p>
      {
        repo.language
          ? (
            <p>
              <span className='fw-bold'>Language: </span>
              {repo.language}
            </p>
          )
          : null
      }
      {
        repo.description
          ? (
            <p>
              {repo.description}
            </p>
          )
          : null
      }
      {
        repo.topics.length
          ? (
            <div>
              <p>Technologies Used:</p>
              <ul>
                {
                  repo.topics.map((topic) => <li key={crypto.randomUUID()}>{topic}</li>)
                }
              </ul>
            </div>
          ) : null
      }
      <div>
        <h4>Recent Commits:</h4>
        {isLoading && <p>Loading commits...</p>}
        {isError && <p>Error loading commits.</p>}
        <ul className='p-0'>
          {commits.map((commit) => (
            <li key={commit.sha} className='list-unstyled d-flex flex-column'>
              <Link href={commit.html_url} target="_blank" className="text-blue-500 hover:underline">
                {commit.sha.slice(0, 6)}
              </Link>
              <div>{commit.commit.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
