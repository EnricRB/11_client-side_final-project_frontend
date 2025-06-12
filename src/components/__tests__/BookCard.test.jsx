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
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the BookCard component with book details', () => {
    // Arrange
    render(<BookCard book={exampleBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    // Act
    // (No hay acción, solo renderizado)
    // Assert
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Autor de prueba')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  it('calls onEdit with the book data when Edit button is clicked', () => {
    // Arrange
    render(<BookCard book={exampleBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    const editButton = screen.getByText('Editar');
    // Act
    fireEvent.click(editButton);
    // Assert
    expect(mockOnEdit).toHaveBeenCalledWith(exampleBook);
  });

  it('calls onDelete with the book id when Eliminar button is clicked', () => {
    // Arrange
    render(<BookCard book={exampleBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByText('Eliminar');
    // Act
    fireEvent.click(deleteButton);
    // Assert
    expect(mockOnDelete).toHaveBeenCalledWith(exampleBook.id);
  });
});
