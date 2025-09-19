import React, { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalOutput from "./TerminalOutput";
import BlinkingCursor from "./BlinkingCursor";
import BlinkingCursorFinal from "./BlinkingCursorFinal";

const aboutMeLines = [
  { command: "whoami", output: "My name is Jesse. I am a Full Stack Developer 🧑‍💻"},
  { command: "cat ~/bio.txt", output: "I am a developer who loves building things that live on the internet. My goal is to always build products that provide real value to users." },
  { command: "cat ~/life/roles.txt", output: "Husband, Father, Developer, Musician" },
  {
    command: "echo $marriage_years",
    output: "3 years and counting!",
    picture: "/images/IMG_0105.jpg"
  },
  { command: "$echo $KID_COUNT", output: "1 (Best project ever)"},
  { command: "cat ~/skills.txt", output: "JavaScript, React, Node.js, Express, MongoDB, SQL, HTML, CSS, Python, Django, RESTful APIs, Git, Docker" },
  { command: "cat ~/passport/stamps.txt", output: "Spain, Portugal, France, England, Canada" },
  {
    command: "echo $PLACES_I_WANT_TO_TRAVEL",
    output: "Japan, Brazil, Iceland, Africa, Hong Kong",
  },
  { command: "How I approach code", output: "From logic to layout, my goal is to build experiences in my work that feel good to use and are fun to share." },
  { command: "About Me", output: "I am a Full Stack Developer currently working on a Learning Management System application at Amentum. I love coding not just for the challenge, but because it is a form of creation - taking ideas from sketch to screen. Whether it's crafting clean APIs or intuitive front ends, I enjoy the whole stack. I am passionate about collaborating with developers, designers, and big thinkers who care about quality and aren't afraid to experiment. If you are someone who builds with curiosity and purpose, we will probably get along just great." },
  { command: "ls ~/hobbies/music", output: "synths/ logc_pro_projects/ guitar/"},
  { command: "ls -la", output: "drwxr-xr-x  5 jesse staff   160 Sep 12 10:00 .\n-rw-r--r--  1 jesse staff   354 Sep 12 09:59 portfolio.md" },
  { command: "echo $FUTURE", output: "Blending my technical skills and my creativity to create unique user experiences." },
  { command: "pwd", output: "/home/jesse" },
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

  useEffect(() => {
    if (lineIndex >= aboutMeLines.length) return;

    const { command, output, link, picture } = aboutMeLines[lineIndex];

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
            return [...prev.slice(0, lineIndex), { command: currentLine + command[charIndex], output: "", link, picture }]
          });
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Command done
        const timeout = setTimeout(() => {
          setIsCommandDone(true);
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
