'use client'
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    modalRef.current = document.getElementById('modal-root');
    setMounted(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Match the duration of the fade animation
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!mounted || !modalRef.current) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: 'block' }} tabIndex="-1" onClick={handleClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" role="heading">Say Hi👋</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>,
    modalRef.current
  );
};

export default Modal;
