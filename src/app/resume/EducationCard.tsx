import React from "react";
import { formatMyDateYear } from "../services/services";

interface Education {
  schoolName: string;
  degree: string;
  startDate: string;
  field: string;
  endDate: string
}


interface EducationCardProps {
  edu: Education;
  index: number;
}

function EducationCard({edu, index}: EducationCardProps) {
  return (
    <div className="card my-4 shadow-lg shadow-dark-mode-white">
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
