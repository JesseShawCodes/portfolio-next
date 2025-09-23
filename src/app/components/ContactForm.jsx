import React, { useState } from 'react';

const ContactForm = ({handleChange, submit, formData, status}) => {
  return (
    <>
      <p className="text-muted text-center mb-4">Thank you for visiting my portfolio. Please send me a quick message if you'd like to say hello.</p>
      <form className="mb-2" onSubmit={submit}>
        {status === 'success' && <div className="alert alert-success">Message sent successfully!</div>}
        {status === 'error' && <div className="alert alert-danger">Something went wrong. Please try again.</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="email" className="form-label">Email</label>
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
          <label htmlFor="message" className="form-label">Message</label>
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
          {status === 'sending' ? 'Sending...' : 'Send a Message'}
        </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
