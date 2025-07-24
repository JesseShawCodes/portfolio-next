import { formatMyDateYear } from "../services/services";

function EducationCard({edu}) {
  return (
    <div className="card my-4">
      <div className="d-flex justify-content-between card-header bg-card-header text-white">
        <div>
          <h2>{edu.schoolName}</h2>
          <p>{edu.degree}</p>
        </div>
        <div className="text-end">
          <p>{edu.field}</p>
          <p>{formatMyDateYear(edu.endDate)}</p>
        </div>
      </div>

    </div>
  );
}

export default EducationCard;
