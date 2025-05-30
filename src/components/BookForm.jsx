import React, { useState, useEffect } from 'react';
import styles from './BookForm.module.css';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    year: '',
    status: 'pending',
  });

  useEffect(() => {
    if (book) {
      // If a book prop is provided, initialize form state with book data
      setBookData({
        title: book.title || '',
        author: book.author || '',
        year: book.year || '',
        status: book.status || 'pending',
        id: book.id, // Keep the ID for updates
      });
    } else {
      // If no book prop, reset form for adding
      setBookData({
        title: '',
        author: '',
        year: '',
        status: 'pending',
      });
    }
  }, [book]); // Rerun effect if the book prop changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookData); // Pass current bookData including id if editing
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{book ? 'Editar Libro' : 'Añadir Nuevo Libro'}</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author">Autor:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="year">Año de publicación:</label>
        <input
          type="number"
          id="year"
          name="year"
          value={bookData.year}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Estado:</label>
        <select id="status" name="status" value={bookData.status} onChange={handleChange}>
          <option value="pending">Pendiente</option>
          <option value="in progress">En progreso</option>
          <option value="read">Leído</option>
        </select>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {book ? 'Actualizar Libro' : 'Guardar Libro'}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default BookForm;
