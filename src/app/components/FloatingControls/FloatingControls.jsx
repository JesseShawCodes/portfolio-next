"use client"
import { React } from 'react';
import { usePathname } from 'next/navigation';
import BackToTop from './BackToTop';
import ThemeButton from './ThemeButton';
import ContactButton from './ContactButton';
import useModal from '../../hooks/useModal';
import ContactModal from '../ContactModal';
import TerminalLoadAll from './TerminalLoadAll';

function FloatingControls() {
  const { isOpen, openModal, closeModal } = useModal();
  const pathname = usePathname();
  return (
    <div className="floating-controls">
      <BackToTop />
      {pathname === '/about' && <TerminalLoadAll />}
      <ContactButton openModal={openModal} />
      <ThemeButton />
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default FloatingControls;
