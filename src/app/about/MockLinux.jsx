import React, { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalOutput from "./TerminalOutput";
import BlinkingCursor from "./BlinkingCursor";
import BlinkingCursorFinal from "./BlinkingCursorFinal";
import { useTerminal } from "../context/TerminalContext";
import { getLocale } from "../../config/locale";

const aboutMeLines = getLocale().about.terminal.lines;

// Disable animations for testing purposes. Always false in production
const Terminal = ({ disableAnimations = false }) => {
  const { terminalLoadAll } = useTerminal();
  const skipAnimations = disableAnimations || terminalLoadAll;

  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [outputCharIndex, setOutputCharIndex] = useState(0);
  const [isCommandDone, setIsCommandDone] = useState(false);

  useEffect(() => {
    if (skipAnimations || lineIndex >= aboutMeLines.length) return;

    const { command, output, link, picture, progress } = aboutMeLines[lineIndex];

    if (!isCommandDone) {
      // Typing command
      if (charIndex < command.length) {
        const timeout = setTimeout(() => {
          const nextCommand = command.slice(0, charIndex + 1);
          setDisplayedLines((prev) => [
            ...prev.slice(0, lineIndex),
            { command: nextCommand, output: "", link, picture, progress },
          ]);
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
        const timeout = setTimeout(() => {
          setCharIndex(0);
          setOutputCharIndex(0);
          setIsCommandDone(false);
          setLineIndex((prev) => prev + 1);
        }, 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [
    lineIndex,
    charIndex,
    outputCharIndex,
    isCommandDone,
    skipAnimations,
  ]);

  const linesToRender = skipAnimations ? aboutMeLines : displayedLines;
  const showFinalCursor = skipAnimations || lineIndex >= aboutMeLines.length;

  return (
    <div
      className="terminal-mock"
    >
      {/* Completed Command Lines*/}
      {linesToRender.map((line, i) => (
        <div key={i}>
          <TerminalLine line={line}/>
          <TerminalOutput output={line} disableAnimations={skipAnimations} />
        </div>
      ))}

      {!skipAnimations && lineIndex < aboutMeLines.length && isCommandDone && (
        <BlinkingCursor />
      )}
      {
        showFinalCursor && <BlinkingCursorFinal />
      }
    </div>
  );
};

export default Terminal;
