import React from 'react';
import { getLocale } from '../../config/locale';

const ContactForm = ({handleChange, submit, formData, status}) => {
  const { contact } = getLocale();

  return (
    <>
      <p className="text-muted text-center mb-4">{contact.intro}</p>
      <form className="mb-2" onSubmit={submit}>
        {status === 'success' && <div className="alert alert-success">{contact.success}</div>}
        {status === 'error' && <div className="alert alert-danger">{contact.error}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">{contact.name}</label>
          <input
            type="text"
            className="form-control rounded-4"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">{contact.email}</label>
          <input
            type="email"
            className="form-control rounded-4"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">{contact.message}</label>
          <textarea
            className="form-control rounded-4"
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <button type="submit" className="btn btn-primary w-100" disabled={status === 'sending'}>
          {status === 'sending' ? contact.submitting : contact.submit}
        </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
