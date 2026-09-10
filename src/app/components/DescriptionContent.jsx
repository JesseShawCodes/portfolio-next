import React from "react";
import ReactMarkdown from "react-markdown";

function DescriptionContent({ description }) {
  if (Array.isArray(description)) {
    if (description.length === 1) {
      return <p>{description[0]}</p>;
    }

    return (
      <ul>
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return <ReactMarkdown>{description}</ReactMarkdown>;
}

export default DescriptionContent;
