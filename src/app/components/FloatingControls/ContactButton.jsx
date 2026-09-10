"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getLocale } from '../../../config/locale';

function ContactButton({ openModal }) {
  const { contact } = getLocale();
  const [showButton] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    showButton && isMounted && (
      <div id="button-container">
        <button
          aria-label={contact.buttonLabel}
          title={contact.buttonLabel}
          id="contact-me"
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
