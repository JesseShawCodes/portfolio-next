import { React } from 'react';

function TechnologyItem({ name="React JS" }) {
  return (
    <span className="badge rounded-pill text-bg-primary mx-1 p-2">
      {name}
    </span>
  );
}

export default TechnologyItem;
