import Image from "next/image";
import Link from "next/link";

function Project({project}) {
  return (
    <div className="project card my-4">
      <div className="card-header">
      <h1>{project.name}</h1>
      <div><Image src={`${project.logo.url}`} width={80} height={80} alt={`${project.name} logo`} /></div>
      </div>
      <div className="card-body">
        <div>
          {project.description}
        </div>
        <div>
          <Link href={project.link} target="_blank">
          {project.link}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;