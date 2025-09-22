"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

function ContactButton({ openModal }) {
  const [showButton] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    showButton && isMounted && (
      <div id="theme-container">
        <button
          aria-label="Contact Me"
          title="Contact Me"
          id="change-theme"
          className="btn-secondary"
          onClick={openModal}
          type="button"
          role="button"
        >
          <FontAwesomeIcon 
            icon={faEnvelope}
          />
        </button>
      </div>
    )
  );
}

export default ContactButton;
