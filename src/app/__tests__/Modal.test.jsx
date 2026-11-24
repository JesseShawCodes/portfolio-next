import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import Modal from '../components/Modal';

describe('Modal', () => {
  describe('without modal-root', () => {
    it('does not render when modal-root is not present', () => {
      const { container } = render(<Modal onClose={jest.fn()}>Content</Modal>);
      expect(container.firstChild).toBeNull();
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('returns null during SSR', () => {
      const html = renderToString(<Modal onClose={jest.fn()}>SSR</Modal>);
      expect(html).toBe('');
    });
  });

  describe('with modal-root', () => {
    beforeEach(() => {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    });

    afterEach(() => {
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot) {
        document.body.removeChild(modalRoot);
      }
    });

    it('renders the modal and calls onClose when the close button is clicked', async () => {
      const handleClose = jest.fn();
      render(
        <Modal onClose={handleClose}>
          <div>Test content</div>
        </Modal>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onClose when the Escape key is pressed', async () => {
      const handleClose = jest.fn();
      render(
        <Modal onClose={handleClose}>
          <div>Test content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it('does not close on non-Escape key presses', () => {
      const handleClose = jest.fn();
      render(
        <Modal onClose={handleClose}>
          <div>Test content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Enter' });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
});
