import PropTypes from 'prop-types';
import BookList from './BookList';
import BookForm from './BookForm';

const MainContent = ({ 
  isFormVisible, 
  books, 
  onEdit, 
  onDelete,
  onSubmit,
  onCancel,
  selectedBook
}) => {
  return (
    <main>
      {isFormVisible ? (
        <div className="form-container">
          <BookForm 
            book={selectedBook}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </div>
      ) : (
        <BookList 
          books={books}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </main>
  );
};

MainContent.propTypes = {
  isFormVisible: PropTypes.bool.isRequired,
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
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    publicationDate: PropTypes.string,
  }),
};

export default MainContent; 