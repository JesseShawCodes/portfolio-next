import React from 'react';
import { render, act } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

jest.useFakeTimers();

describe('ProgressBar', () => {
  it('renders the progress bar and updates the progress', () => {
    const { getByText } = render(<ProgressBar label="Test" />);

    expect(getByText('Test...')).toBeInTheDocument();
    expect(getByText('0%')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(getByText('5%')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1900);
    });

    expect(getByText('100%')).toBeInTheDocument();
  });
});
