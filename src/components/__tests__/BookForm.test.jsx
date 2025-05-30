import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BookForm from '../BookForm';

describe('BookForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  afterEach(() => {
    cleanup(); // Limpiar el DOM después de cada test
  });

  it('renders the BookForm component', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Año/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nuevo Título' } });
    fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'Nuevo Autor' } });
    fireEvent.change(screen.getByLabelText(/Año/i), { target: { value: '2024' } });
    fireEvent.change(screen.getByLabelText(/Estado/i), { target: { value: 'pending' } });

    const submitButton = screen.getByRole('button', { name: /Guardar/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Nuevo Título',
      author: 'Nuevo Autor',
      year: '2024',
      status: 'pending',
    });
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
