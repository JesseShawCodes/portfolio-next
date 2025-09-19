function BlinkingCursor({ currentLine }) {
  return (
    <div>
      <span>$</span>
      <span className="ms-2">{currentLine}</span>
      <span className="blinking-cursor">|</span>
    </div>
  );
}

export default BlinkingCursor;
