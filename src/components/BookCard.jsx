import React from 'react';
import styles from './BookCard.module.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className={styles.bookCard}>
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Año: {book.year}</p>
      <p>Estado: {book.status}</p>
      <div className={styles.actions}>
        <button onClick={() => onEdit(book)} className={styles.editButton}>
          Editar
        </button>
        <button onClick={() => onDelete(book.id)} className={styles.deleteButton}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default BookCard;
