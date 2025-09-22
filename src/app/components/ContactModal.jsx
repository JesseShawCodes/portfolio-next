import React from 'react';
import Modal from './Modal';
import ContactForm from './ContactForm';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <ContactForm />
    </Modal>
  );
};

export default ContactModal;
