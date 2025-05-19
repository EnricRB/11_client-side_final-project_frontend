import PropTypes from 'prop-types';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return <p>No hay libros disponibles. ¡Añade tu primer libro!</p>;
  }

  return (
    <div className="grid">
      {books.map(book => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Género:</strong> {book.genre}</p>
          <p><strong>Publicado:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
          <div className="book-actions">
            <button onClick={() => onEdit(book)}>Editar</button>
            <button onClick={() => onDelete(book.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      publicationDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList; 