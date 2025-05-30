import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BookList from '../BookList';

// Mock de la API global fetch
let mockBooks = [
  { id: 1, title: 'Libro 1', author: 'Autor 1', year: 2020, status: 'completed' },
  { id: 2, title: 'Libro 2', author: 'Autor 2', year: 2021, status: 'pending' },
];

describe('BookList', () => {
  // Guardar la implementación original de fetch
  const originalFetch = window.fetch;

  beforeEach(() => {
    // Mockear fetch antes de cada test
    window.fetch = vi.fn((url, options) => {
      if (url.endsWith('/Book')) {
        if (options?.method === 'POST') {
          // Simular añadir libro
          const newBook = JSON.parse(options.body);
          newBook.id = Date.now(); // Asignar un ID simple para el mock
          mockBooks.push(newBook);
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(newBook),
          });
        } else {
          // Simular obtener libros
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockBooks),
          });
        }
      } else if (options?.method === 'DELETE') {
        // Simular eliminar libro
        const bookIdToDelete = url.split('/').pop();
        const initialLength = mockBooks.length;
        mockBooks = mockBooks.filter((book) => book.id !== parseInt(bookIdToDelete));
        if (mockBooks.length < initialLength) {
          return Promise.resolve({ ok: true });
        } else {
          return Promise.resolve({ ok: false, status: 404 }); // No encontrado
        }
      }
      // Si no coincide con ninguna ruta mockeada, usar la fetch original o lanzar un error
      return originalFetch(url, options);
    });
  });

  afterEach(() => {
    // Restaurar la implementación original de fetch después de cada test
    window.fetch = originalFetch;
    // Resetear los mockBooks para cada test
    mockBooks = [
      { id: 1, title: 'Libro 1', author: 'Autor 1', year: 2020, status: 'completed' },
      { id: 2, title: 'Libro 2', author: 'Autor 2', year: 2021, status: 'pending' },
    ];
    cleanup(); // Limpiar el DOM después de cada test
  });

  it('renders and fetches books on initial load', async () => {
    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText('Libro 1')).toBeInTheDocument();
      expect(screen.getByText('Libro 2')).toBeInTheDocument();
    });

    // Verifica que fetch fue llamado con una URL que contiene /Book
    expect(window.fetch).toHaveBeenCalledWith(expect.stringContaining('/Book'));
    expect(window.fetch).toHaveBeenCalledOnce();
  });

  it('allows deleting a book and updates the list', async () => {
    render(<BookList />);

    // Espera a que los libros iniciales se carguen
    await waitFor(() => {
      expect(screen.getByText('Libro 1')).toBeInTheDocument();
      expect(screen.getByText('Libro 2')).toBeInTheDocument();
    });

    // Encuentra y haz clic en el botón de eliminar para el Libro 1
    const deleteButtons = screen.getAllByText('Eliminar');
    // Asumiendo que el primer botón eliminar corresponde al Libro 1 en este mock
    fireEvent.click(deleteButtons[0]);

    // Espera a que el Libro 1 desaparezca de la lista
    await waitFor(() => {
      expect(screen.queryByText('Libro 1')).not.toBeInTheDocument();
      expect(screen.getByText('Libro 2')).toBeInTheDocument();
    });

    // Verifica que fetch fue llamado para eliminar
    expect(window.fetch).toHaveBeenCalledWith(expect.stringContaining('/Book/1'), {
      method: 'DELETE',
    });
  });

  // Podríamos añadir tests para añadir/editar, pero con BookForm ya cubrimos la entrada de datos.
  // El test de carga inicial verifica la integración básica con la API mockeada.
});
