"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import { useIsClient } from '../../hooks/useIsClient';

function ThemeButton() {
  const [showButton] = useState(true);
  const isMounted = useIsClient();
  const { theme, toggleTheme } = useTheme();

  return (
    showButton && isMounted && (
      <div id="button-container">
        <button
          aria-label="Change Theme"
          id="change-theme"
          className="btn-secondary"
          onClick={toggleTheme}
          type="button"
        >
          <FontAwesomeIcon 
            icon={theme === 'light' ? faSun : faMoon} 
            className={`theme-icon sun-icon`} 
          />
        </button>
      </div>
    )
  );
}

export default ThemeButton;
