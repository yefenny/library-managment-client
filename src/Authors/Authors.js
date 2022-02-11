import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';
import AuthorService from '../Services/AuthorService';
import AuthorList from '../AuthorsList/AuthorsList';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    let isCancelled = false;
    AuthorService.getAuthors().then((res) => {
      if (!isCancelled) setAuthors(res);
    });

    return () => {
      isCancelled = true;
    };
  }, [authors]);
  const errorHandle = (value) => {
    setError(value);
  };

  if (AccountService.getUserType() !== 'LIBRARIAN') {
    <div>
      <h3>You don't have access to this resource</h3>
    </div>;
  } else {
    const dynamicSearch = () => {
      return authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Authors</h2>
          <p>Star enjoing your favorites Authors.</p>
        </header>

        <div className='searchContainer'>
          {/* <label htmlFor='searchBy'>Search: </label> */}
          <button
            className='addBook'
            onClick={() => {
              window.location = '/new/author';
            }}
          >
            {' '}
            + Add Author
          </button>
          <input
            type='text'
            id='searchBy'
            name='searchBy'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder='Search by name'
          />
        </div>
        <div className='list-item remove-border'>
          <div className='error'>{error}</div>
          {/* <ul>{subjects}</ul> */}
          <AuthorList authors={dynamicSearch()} errorHandle={errorHandle} />
        </div>
      </div>
    );
  }
}
export default Authors;
