import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

// Mock the props that the parent component (ContactModal) would pass down
const mockHandleChange = jest.fn();
const mockSubmit = jest.fn((e) => e.preventDefault()); // Prevent default form submission behavior in test

describe('ContactForm', () => {
  // Clear mock history before each test
  beforeEach(() => {
    mockHandleChange.mockClear();
    mockSubmit.mockClear();
  });

  const formData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Test message',
  };

  it('renders all form fields with initial data', () => {
    render(
      <ContactForm
        handleChange={mockHandleChange}
        submit={mockSubmit}
        formData={formData}
        status=""
      />
    );

    // Check if inputs are rendered with the correct values from props
    expect(screen.getByLabelText('Name')).toHaveValue(formData.name);
    expect(screen.getByLabelText('Email')).toHaveValue(formData.email);
    expect(screen.getByLabelText('Message')).toHaveValue(formData.message);
  });

  it('calls the handleChange prop when a user types in a field', () => {
    render(
      <ContactForm
        handleChange={mockHandleChange}
        submit={mockSubmit}
        formData={{ name: '', email: '', message: '' }} // Start with empty form data
        status=""
      />
    );

    // Simulate typing in the name field
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Jane' } });

    // Expect the handleChange prop function to have been called
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('calls the submit prop when the form is submitted', () => {
    render(
      <ContactForm
        handleChange={mockHandleChange}
        submit={mockSubmit}
        formData={formData}
        status=""
      />
    );

    // Simulate clicking the submit button
    const submitButton = screen.getByText('Send a Message');
    fireEvent.click(submitButton);

    // Expect the submit prop function to have been called
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays a success message when status is "success"', () => {
    render(
      <ContactForm
        handleChange={mockHandleChange}
        submit={mockSubmit}
        formData={formData}
        status="success"
      />
    );

    expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
  });

  it('displays an error message when status is "error"', () => {
    render(
      <ContactForm
        handleChange={mockHandleChange}
        submit={mockSubmit}
        formData={formData}
        status="error"
      />
    );

    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('disables the submit button and shows "Sending..." text when status is "sending"', () => {
    render(
      <ContactForm
        handleChange={mockHandleChange}
        submit={mockSubmit}
        formData={formData}
        status="sending"
      />
    );

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
  });
});
