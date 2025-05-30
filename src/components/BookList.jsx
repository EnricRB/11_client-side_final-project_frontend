import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import BookForm from '../BookForm/BookForm';
import styles from './BookList.module.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Book`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
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
      const newBook = await response.json();
      setBooks([...books, newBook]);
      setIsFormVisible(false);
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
      const updatedBook = await response.json();
      setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
      setSelectedBook(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/Book/${bookId}`, {
        method: 'DELETE',
      });
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
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
      >
        Add New Book
      </button>

      {isFormVisible && (
        <BookForm
          book={selectedBook}
          onSubmit={selectedBook ? handleEditBook : handleAddBook}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedBook(null);
          }}
        />
      )}

      <div className={styles.bookGrid}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={(book) => {
              setSelectedBook(book);
              setIsFormVisible(true);
            }}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
