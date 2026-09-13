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

  it('stays at 100% after the interval fires past completion', () => {
    const { getByText } = render(<ProgressBar label="Test" />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(getByText('100%')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(getByText('100%')).toBeInTheDocument();
  });

  it('respects a custom duration', () => {
    const { getByText } = render(<ProgressBar label="Slow" duration={200} />);

    expect(getByText('0%')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(getByText('5%')).toBeInTheDocument();
  });

  it('clears the interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<ProgressBar label="Test" />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
