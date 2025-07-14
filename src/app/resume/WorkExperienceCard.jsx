import Image from "next/image";

function WorkExperienceCard({ project, index }) {
  return (
    <div className='card my-4' key={`project-${index}`}>
      <div className='card-header bg-card-header text-white'>
        <h2>{project.title}</h2>
        <h3>{project.company}</h3>
        <h4>{project.startdate} - {project.enddate ? project.enddate : "Present"}</h4>
        {
          project.logo ?
          <Image src={project.logo[0].url} width={200} height={100} alt={'Amentum Logo'}/>
          :
          null
        }
      </div>

      <div className="card-body p-6">
        {project.description}
      </div>
      {/*
      footer section to be added
      <div class="card-footer text-center">
        <p>Technologies Used:</p>
      </div>
      */}
    </div>
  )
}

export default WorkExperienceCard;