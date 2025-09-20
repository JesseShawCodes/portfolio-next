import { useState, useEffect } from "react";

const ProgressBar = ({ label, duration = 100 }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >=100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      })
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);
  
  return (
    <div style={{marginTop: "0.5rem"}}>
      <div
        style={{
          backgroundColor: "#ffffffff",
          width: "100%",
          borderRadius: "4px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            height: "12px",
            width: `${progress}%`,
            background: "#33ff33",
            transition: "width 0.2s"
          }}
        >

        </div>

      </div>
      <div>
        <div>
          {label}...
        </div>
        <div>
          {progress}%
        </div>
      </div>
    </div>
  )
};

export default ProgressBar;