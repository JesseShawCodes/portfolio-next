"use client"
import { React } from 'react';
import BackToTop from './BackToTop';
import ThemeButton from './ThemeButton';
import ContactButton from './ContactButton';
import useModal from '../../hooks/useModal';
import ContactModal from '../ContactModal';

function FloatingControls() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="floating-controls">
      <BackToTop />
      <ContactButton openModal={openModal} />
      <ThemeButton />
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default FloatingControls;
