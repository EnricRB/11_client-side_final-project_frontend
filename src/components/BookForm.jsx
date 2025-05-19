import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationDate: book.publicationDate.split('T')[0],
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{book ? 'Editar Libro' : 'Añadir Nuevo Libro'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Introduce el título del libro"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Introduce el nombre del autor"
        />
      </div>

      <div className="form-group">
        <label htmlFor="genre">Género</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          placeholder="Introduce el género del libro"
        />
      </div>

      <div className="form-group">
        <label htmlFor="publicationDate">Fecha de Publicación</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {book ? 'Actualizar' : 'Crear'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    publicationDate: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BookForm; 