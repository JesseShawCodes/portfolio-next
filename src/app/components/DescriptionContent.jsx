import React from "react";
import ReactMarkdown from "react-markdown";

function DescriptionContent({ description, asParagraphs = false }) {
  if (Array.isArray(description)) {
    if (asParagraphs) {
      return description.map((item, index) => <p key={index}>{item}</p>);
    }

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
