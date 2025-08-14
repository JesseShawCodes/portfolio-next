import Link from "next/link";

const CallToActionButton = ({ url = "/resume", text= "Go to Resume", customClass="" }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 ${customClass}`}>
      <Link href={url} className="btn btn-primary">{text}</Link>
    </div>
  );
};

export default CallToActionButton;