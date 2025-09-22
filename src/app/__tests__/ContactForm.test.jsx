import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('submits the form with the correct data', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    const { getByLabelText, getByText } = render(<ContactForm />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'Test message' } });

    fireEvent.click(getByText('Send'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john.doe@example.com',
          message: 'Test message',
        }),
      });
    });
  });

  it('handles server error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    const { getByLabelText, getByText, findByText } = render(<ContactForm />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'Test message' } });

    fireEvent.click(getByText('Send'));

    expect(await findByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('handles network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    const { getByLabelText, getByText, findByText } = render(<ContactForm />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'Test message' } });

    fireEvent.click(getByText('Send'));

    expect(await findByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });
});
