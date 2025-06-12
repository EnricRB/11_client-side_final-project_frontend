import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BookList from '../BookList';

let mockBooks = [
  { id: 1, title: 'Libro 1', author: 'Autor 1', year: 2020, status: 'completed' },
  { id: 2, title: 'Libro 2', author: 'Autor 2', year: 2021, status: 'pending' },
];

describe('BookList', () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    window.fetch = vi.fn((url, options) => {
      if (url.endsWith('/Book')) {
        if (options?.method === 'POST') {
          const newBook = JSON.parse(options.body);
          newBook.id = Date.now();
          mockBooks.push(newBook);
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(newBook),
          });
        } else {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockBooks),
          });
        }
      } else if (options?.method === 'DELETE') {
        const bookIdToDelete = url.split('/').pop();
        const initialLength = mockBooks.length;
        mockBooks = mockBooks.filter((book) => book.id !== parseInt(bookIdToDelete));
        if (mockBooks.length < initialLength) {
          return Promise.resolve({ ok: true });
        } else {
          return Promise.resolve({ ok: false, status: 404 });
        }
      }
      return originalFetch(url, options);
    });
  });

  afterEach(() => {
    window.fetch = originalFetch;
    mockBooks = [
      { id: 1, title: 'Libro 1', author: 'Autor 1', year: 2020, status: 'completed' },
      { id: 2, title: 'Libro 2', author: 'Autor 2', year: 2021, status: 'pending' },
    ];
    cleanup();
  });

  it('renders and fetches books on initial load', async () => {
    // Arrange
    render(<BookList />);
    // Act
    // (No hay acción, solo renderizado y espera)
    // Assert
    await waitFor(() => {
      expect(screen.getByText('Libro 1')).toBeInTheDocument();
      expect(screen.getByText('Libro 2')).toBeInTheDocument();
    });
    expect(window.fetch).toHaveBeenCalledWith(expect.stringContaining('/Book'));
    expect(window.fetch).toHaveBeenCalledOnce();
  });

  it('allows deleting a book and updates the list', async () => {
    // Arrange
    render(<BookList />);
    // Act
    await waitFor(() => {
      expect(screen.getByText('Libro 1')).toBeInTheDocument();
      expect(screen.getByText('Libro 2')).toBeInTheDocument();
    });
    const deleteButtons = screen.getAllByText('Eliminar');
    fireEvent.click(deleteButtons[0]);
    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Libro 1')).not.toBeInTheDocument();
      expect(screen.getByText('Libro 2')).toBeInTheDocument();
    });
    expect(window.fetch).toHaveBeenCalledWith(expect.stringContaining('/Book/1'), {
      method: 'DELETE',
    });
  });
});
