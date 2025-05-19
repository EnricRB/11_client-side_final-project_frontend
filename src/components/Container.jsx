import PropTypes from 'prop-types';
import Header from './Header';
import MainContent from './MainContent';

const Container = ({ 
  books,
  isFormVisible,
  selectedBook,
  onAddBook,
  onEdit,
  onDelete,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="container">
      <Header onAddBook={onAddBook} />
      <MainContent 
        isFormVisible={isFormVisible}
        books={books}
        onEdit={onEdit}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onCancel={onCancel}
        selectedBook={selectedBook}
      />
    </div>
  );
};

Container.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      publicationDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  isFormVisible: PropTypes.bool.isRequired,
  selectedBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    publicationDate: PropTypes.string,
  }),
  onAddBook: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Container; 