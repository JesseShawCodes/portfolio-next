import React from 'react';
import Link from 'next/link';
// import { NavLink } from 'react-router-dom';

export default function Repo(repository) {
  const { repo } = repository;

  return (
    <section className="card my-2 mx-3 p-3" key={repo.id}>
      <h3>{repo.name}</h3>
      <Link target="_blank" href={repo.html_url}>Repo</Link>
      <p>
        Updated At:
        {repo.updated_at}
      </p>
      {
        repo.language
          ? (
            <p>
              Language:
              <span>{repo.language}</span>
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
    </section>
  );
}
