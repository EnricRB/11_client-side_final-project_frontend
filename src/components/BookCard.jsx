import React from 'react';
import styles from './BookCard.module.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.bookInfo}>
        <div className={styles.titleAndAuthor}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
        <span className={styles.year}>{book.year}</span>
      </div>
      <span className={`${styles.statusTag} ${styles[book.status.replace(' ', '')]}`}>
        {book.status}
      </span>
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
