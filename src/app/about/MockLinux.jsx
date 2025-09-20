import React, { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalOutput from "./TerminalOutput";
import BlinkingCursor from "./BlinkingCursor";
import BlinkingCursorFinal from "./BlinkingCursorFinal";

const aboutMeLines = [
  { command: "sudo apt install about-me", progress: true },
  { command: "whoami", output: "My name is Jesse Shaw. I am a Full Stack Developer 🧑‍💻"},
  // { command: "cat ~/bio.txt", output: "I am a developer who loves building things that live on the internet. My goal is to always build products that provide real value to users." },
  { command: "cat ~/life/roles.txt", output: "Husband | Father | Developer | Traveler | Music Producer" },
  {
    command: "echo $marriage_years",
    output: "3 years and counting! ❤️",
    picture: "/images/IMG_0105.jpg"
  },
  { command: "$echo $KID_COUNT", output: "1 (Best project ever)"},
  { command: "cat ~/skills.txt", output: "JavaScript, React, Ruby on Rails, Salesforce Commerce Cloud, SQL, HTML, CSS, Python, Django, RESTful APIs, Git, Docker" },
  { command: "cat ~/passport/stamps.txt", output: "Spain, Portugal, France, England, Canada" },
  {
    command: "echo $PLACES_I_WANT_TO_TRAVEL",
    output: "Japan, Brazil, Iceland, Africa, Hong Kong",
  },
  { command: "ls ~/hobbies/music", output: "synths/ logc_pro_projects/ guitar/"},
  { command: "echo $FUTURE", output: "Blending my technical skills and my creativity to create unique user experiences." },
  { command: "cat portfolio.md", output: "# My Portfolio\n\nYou can check out my portfolio at the link below.", link: "/portfolio" },
  { command: "cat Resume.md", link: "/resume" },
];

// Disable animations for testing purposes. Always false in production
const Terminal = ({ disableAnimations = false }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  // 
  const [charIndex, setCharIndex] = useState(0);
  const [outputCharIndex, setOutputCharIndex] = useState(0);
  const [isCommandDone, setIsCommandDone] = useState(false);

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (lineIndex >= aboutMeLines.length) return;

    const { command, output, link, picture, progress } = aboutMeLines[lineIndex];

    if (disableAnimations) {
      setDisplayedLines(aboutMeLines);
      setLineIndex(aboutMeLines.length);
      return;
    }

    if (!isCommandDone) {
      // Typing command
      if (charIndex < command.length) {
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => {
            return prev + command[charIndex];
          });
          setDisplayedLines((prev) => {
            return [...prev.slice(0, lineIndex), { command: currentLine + command[charIndex], output: "", link, picture, progress }]
          });
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Command done
        const timeout = setTimeout(() => {
          setIsCommandDone(true);
          progress && setShowProgress(true);
        }, 100);
        return () => clearTimeout(timeout);
      }
    } else {
      // Typing output
      if (output && outputCharIndex < output.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            if (newLines[lineIndex]) {
              newLines[lineIndex] = {
                ...newLines[lineIndex],
                output: newLines[lineIndex].output + output[outputCharIndex],
                finalOutput: output,
              };
            }
            return newLines;
          });
          setOutputCharIndex(outputCharIndex + 1);
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        // Output done, move to next line
        lineDone()
      }
    }
  }, [lineIndex, charIndex, outputCharIndex, isCommandDone, disableAnimations]);

  function lineDone() {
    setCurrentLine("");
    setCharIndex(0);
    setOutputCharIndex(0);
    setIsCommandDone(false);
    setLineIndex(lineIndex + 1);
    setShowProgress(false);
  }

  return (
    <div
      className="terminal-mock"
    >
      {/* Completed Command Lines*/}
      {displayedLines.map((line, i) => (
        <div key={i}>
          <TerminalLine line={line}/>
          <TerminalOutput output={line} />
        </div>
      ))}

      {lineIndex < aboutMeLines.length && isCommandDone && (
        <BlinkingCursor />
      )}
      {
        lineIndex >= aboutMeLines.length && <BlinkingCursorFinal />
      }
    </div>
  );
};

export default Terminal;
