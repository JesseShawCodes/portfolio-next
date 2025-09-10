"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchGitHubData } from '../services/fetchGitHubData';
import { formatMyDateDetail } from '../services/services';
import TechnologyItem from './TechnologyItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faInstagram, faLinkedin, faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function Repo(repository) {
  const { repo } = repository;
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Git Hub API.
  useEffect(() => {
    (async () => {
      try {
        

        const data = await fetchGitHubData(`https://api.github.com/repos/JesseShawCodes/${repo.name}/commits?per_page=3`);
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
  }, [repo]);

  return (
    <section className="card my-4 mx-3 p-3 card-top-border shadow-lg shadow-dark-mode-white" key={repo.id}>
      <h3>{repo.cmsName}</h3>
      <h4 className='my-2'>
        <Link target="_blank" href={repo.html_url} className='link-underline link-underline-opacity-0'><FontAwesomeIcon icon={faGithub} />Repo</Link>
      </h4>

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
            <div className='mb-4'>
              <p>Technologies Used:</p>
              <div>
                {
                  repo.topics.map((topic) => <TechnologyItem key={topic} name={topic} />)
                }
              </div>
            </div>
          ) : null
      }
      <div>
        <h4>Recent Commits:</h4>
        {isLoading && <p>Loading commits...</p>}
        {isError && <p>Error loading commits.</p>}
        <ul className='p-0'>
          {commits.map((commit) => (
            <li key={commit.sha} className='list-unstyled d-flex flex-column card border-0 my-2 pb-2'>
              <h5 className='d-flex flex-row justify-content-between'>
                <Link href={commit.html_url} target="_blank" className="text-blue-500 hover:underline link-underline link-underline-opacity-0">
                  <FontAwesomeIcon icon={faGithub} />{commit.sha.slice(0, 6)}
                </Link>
                {formatMyDateDetail(commit.commit.author.date)}
              </h5>
              <div>{commit.commit.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
