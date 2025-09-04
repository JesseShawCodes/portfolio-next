import React from "react";
import Link from "next/link";

const DownloadButton = ({ pdfUrl }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link href={pdfUrl} className="btn btn-primary" passHref>
        Download CV
      </Link>
    </div>
  );
};

export default DownloadButton;