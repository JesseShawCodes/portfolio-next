import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactButton from '../components/FloatingControls/ContactButton';

describe('ContactButton', () => {
  it('renders the button and calls openModal when clicked', () => {
    const openModal = jest.fn();
    const { getByLabelText } = render(<ContactButton openModal={openModal} />);

    const button = getByLabelText('Contact Me');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(openModal).toHaveBeenCalledTimes(1);
  });
});
