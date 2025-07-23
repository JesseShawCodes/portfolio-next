import formatMyDate from "../services/services";

function EducationCard({edu}) {
  return (
    <div className="card my-4">
      <div className="card-header bg-card-header text-white">
        <h2>{edu.schoolName}</h2>
        <p>{edu.degree}</p>
      </div>
      <div className="card-body p-6">
        <ul>
          <li>{edu.field}</li>
          <li>{formatMyDate(edu.startDate)} - {formatMyDate(edu.endDate)}</li>
        </ul>
      </div>
    </div>
  );
}

export default EducationCard;
