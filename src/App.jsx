import { useState } from 'react'
import Container from './components/Container'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleAddBook = () => {
    setSelectedBook(null)
    setIsFormVisible(true)
  }

  const handleEditBook = (book) => {
    setSelectedBook(book)
    setIsFormVisible(true)
  }

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId))
  }

  const handleFormSubmit = (bookData) => {
    if (selectedBook) {
      setBooks(books.map(book => 
        book.id === selectedBook.id ? { ...bookData, id: book.id } : book
      ))
    } else {
      setBooks([...books, { ...bookData, id: Date.now().toString() }])
    }
    setIsFormVisible(false)
  }

  const handleFormCancel = () => {
    setIsFormVisible(false)
    setSelectedBook(null)
  }

  return (
    <Container 
      books={books}
      isFormVisible={isFormVisible}
      selectedBook={selectedBook}
      onAddBook={handleAddBook}
      onEdit={handleEditBook}
      onDelete={handleDeleteBook}
      onSubmit={handleFormSubmit}
      onCancel={handleFormCancel}
    />
  )
}

export default App
