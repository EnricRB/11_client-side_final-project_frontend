import React, { useState, useEffect } from 'react';
import styles from './BookList.module.css';
import BookForm from './BookForm';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Book`);
      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Error al cargar los libros');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Error al añadir el libro');
      }
      const newBook = await response.json();
      setBooks([...books, newBook]);
      setIsFormVisible(false);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = async (bookData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Book/${bookData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el libro');
      }
      fetchBooks();
      setSelectedBook(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Book/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el libro');
      }
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setSelectedBook(null);
  };

  const handleShowEditForm = (book) => {
    setSelectedBook(book);
    setIsFormVisible(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Book Collection</h1>

      <button
        className={styles.addButton}
        onClick={() => {
          setSelectedBook(null);
          setIsFormVisible(true);
        }}
        disabled={isFormVisible}
      >
        Add New Book
      </button>

      {isFormVisible && (
        <BookForm
          book={selectedBook}
          onSubmit={selectedBook ? handleEditBook : handleAddBook}
          onCancel={handleCancelForm}
        />
      )}

      {isLoading && <div className={styles.loading}>Cargando libros...</div>}

      {error && <div className={styles.error}>{error}</div>}

      {!isLoading && !error && books.length === 0 ? (
        <p className={styles.emptyMessage}>
          No hay libros en tu biblioteca. ¡Añade tu primer libro!
        </p>
      ) : (
        !isLoading &&
        !error && (
          <div className={styles.bookGrid}>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleShowEditForm}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default BookList;
