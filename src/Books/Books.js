import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from '../BookList/BookList';
import { MemberContext } from '../Context/MemberContext';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { memberCheckout } = useContext(MemberContext);
  const { error, setNewError } = useState('');
  const { alert, setAlert } = useState('');

  useEffect(() => {
    BookService.getBooks().then((res) => {
      setBooks(res);
    });
  }, []);

  const setErrorValue = (values) => {
    setNewError(values);
  };

  if (!AccountService.getCardNumber() && !AccountService.getBarcode()) {
    window.location = 'login';
  } else {
    const filterFunction = (book) => {
      let isInclude = false;
      for (let i = 0; i < book.subjects.length; i++) {
        isInclude = book.subjects[0].name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      if (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publicationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        isInclude
      )
        return true;
    };
    const dynamicSearch = () => {
      return books.filter(filterFunction);
    };
    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Books</h2>
          <p>Star enjoing your favorite books.</p>
        </header>

        <div className='searchContainer'>
          {/* <label htmlFor='searchBy'>Search: </label> */}
          {AccountService.getUserType() === 'LIBRARIAN' && (
            <button
              className='addBook'
              onClick={() => {
                window.location = '/new/book';
              }}
            >
              {' '}
              + Add book
            </button>
          )}

          <input
            type='text'
            id='searchBy'
            name='searchBy'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder='Search by title, author, subject category and publication date'
          />
        </div>
        <div className='error'>{error}</div>
        <div className='alert'>{alert}</div>
        <div className='books-list-container'>
          {
            <BookList
              books={dynamicSearch()}
              setError={setErrorValue}
              setAlert={setAlert}
            />
          }
        </div>
      </div>
    );
  }
}
export default Books;
