import React from 'react';
import Link from "next/link";
import { getLocale } from "../../config/locale";

const DownloadButton = ({ pdfUrl }) => {
  const { resume } = getLocale();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link href={pdfUrl} className="btn btn-primary" passHref>
        {resume.downloadCv}
      </Link>
    </div>
  );
};

export default DownloadButton;