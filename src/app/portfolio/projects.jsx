import Image from "next/image";

function Project({project}) {
  console.log(project);
  return (
    <div className="project card">
      <div className="card-header">
      <h1>{project.name}</h1>
      <div><Image src={`${project.logo.url}`} width={30} height={40} alt={`${project.name} logo`} /></div>
      </div>
      <div className="card-body">
        {project.description}
      </div>
    </div>
  );
}

export default Project;