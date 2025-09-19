function TerminalLine({ line }) {
  // debugger;
  return (
    <div className="terminal-line">
      <span className="terminal-prompt">$</span> {line.command}
    </div>
  );
}

export default TerminalLine;
