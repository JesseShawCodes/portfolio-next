import { renderHook, act } from '@testing-library/react';
import useModal from '../useModal';

describe('useModal', () => {
  it('should open and close the modal', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
