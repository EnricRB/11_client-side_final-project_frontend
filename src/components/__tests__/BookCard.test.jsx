import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BookCard from '../BookCard';

describe('BookCard', () => {
  const exampleBook = {
    id: 1,
    title: 'Título de prueba',
    author: 'Autor de prueba',
    year: 2023,
    status: 'completed',
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    // Limpiar los mocks antes de cada test
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
  });

  afterEach(() => {
    cleanup(); // Limpiar el DOM después de cada test
  });

  it('renders the BookCard component with book details', () => {
    render(<BookCard book={exampleBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // Verifica que los detalles del libro se renderizan
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Autor de prueba')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  it('calls onEdit with the book data when Edit button is clicked', () => {
    render(<BookCard book={exampleBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(exampleBook);
  });

  it('calls onDelete with the book id when Eliminar button is clicked', () => {
    render(<BookCard book={exampleBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByText('Eliminar');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(exampleBook.id);
  });
});
