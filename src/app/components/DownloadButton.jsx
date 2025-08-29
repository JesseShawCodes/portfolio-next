import React from "react";
import Link from "next/link";

const DownloadButton = ({ pdfUrl = "/JesseShaw_Resume.pdf", fileName = "JesseShaw_Resume.pdf" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link href={pdfUrl} download={fileName} className="btn btn-primary" passHref>
        Download CV
      </Link>
    </div>
  );
};

export default DownloadButton;