import PropTypes from 'prop-types';

const Header = ({ onAddBook }) => {
  return (
    <header>
      <h1>Gestión de Libros</h1>
      <button onClick={onAddBook}>Añadir Libro</button>
    </header>
  );
};

Header.propTypes = {
  onAddBook: PropTypes.func.isRequired,
};

export default Header; 