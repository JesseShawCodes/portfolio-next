"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { useTerminal } from '../../context/TerminalContext';

function TerminalLoadAll() {
  const { terminalLoadAll, loadAllTerminalContent } = useTerminal();

  return (
    !terminalLoadAll && (
      <div id="button-container">
        <button
          aria-label="Load All Terminal"
          title="Load All Terminal Content"
          id="load-terminal"
          className="btn-secondary"
          onClick={loadAllTerminalContent}
          type="button"
          role="button"
        >
          <FontAwesomeIcon 
            icon={faTerminal}
          />
        </button>
      </div>
    )
  );
}

export default TerminalLoadAll;
