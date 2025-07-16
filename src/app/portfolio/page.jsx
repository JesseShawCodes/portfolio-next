"use client";
import React, {useRef, useState, useEffect} from "react";
import P5Sketch from "./sketch";
import Repo from "../components/Repo";
import { Octokit } from "octokit";
import Link from "next/link";

export default function Page() {
  const p5Ref = useRef(null);
  const [repositories, setRepositories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const octokit = new Octokit();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await octokit.request('GET /users/JesseShawCodes/repos', {
          username: 'JesseShawCodes',
          sort: 'updated',
          direction: 'desc',
          per_page: 20,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        });
        setRepositories(data);
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

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  const handleSketchReady = (p5Instance) => {
    p5Ref.current = p5Instance;
  }
  return (
    <div className="container">
    {/*
      p5 Sketch to be added later
    <P5Sketch />
    */}
      <h1>Projects</h1>
      <div>
        <p>My time is currently being taken up by my Full Time job at Amentum. But I do wanna make sure I am putting in extra time to keep up with new tools and work on some of my own projects to stay sharp.</p>

        <p>One passion project I am working on right now is a music rating application built using React, Django, and a MySQL database. The Git Repository for that project can be found below (Music March Madness). This application can be tested here: <Link href="https://dadgad.netlify.app/" target="_blank">Dadgad Live Application</Link></p>

        <p>If you would like to keep up with all of the other work I am doing outside of my work at Amentum, please check out my GitHub projects below</p>
        <div style={{ maxWidth: '1200px', margin: '0px auto' }}>
          <div>
            {
              isError
                ? (
                  <div>
                    <p>
                      {isError.message.message}
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
