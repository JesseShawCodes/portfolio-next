"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

function ThemeButton() {
  const [showButton] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
