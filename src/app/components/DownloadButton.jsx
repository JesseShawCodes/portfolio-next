const DownloadButton = ({ pdfUrl = "/JesseShaw_Resume.pdf", fileName = "JesseShaw_Resume.pdf" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <a
        href={pdfUrl} // The URL of the PDF file
        download={fileName} // The filename for the downloaded file
        className="btn btn-primary"
      >
        Download CV
      </a>
    </div>
  );
};

export default DownloadButton;