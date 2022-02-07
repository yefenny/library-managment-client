import { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function Book() {
  const [book, setBook] = useState({});
  const state = useLocation().state;

  useEffect(() => {
    setBook(state.book);
  }, [book]);

  if (AccountService.getUserType !== 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='view-item view-book'>
          <h2>{book.title}</h2>
          <div>
            <label>Format: </label>
            <span>{book.format}</span>
          </div>
          <div>
            <label>Author: </label>
            <span>{book.author ? book.author.name : ''}</span>
          </div>
          <div>
            <label>Publisher: </label>
            <span>{book.publisher}</span>
          </div>
          <div>
            <label>Subjects: </label>
            <span>
              {book.subjects
                ? BookService.createSubjectsList(book.subjects)
                : ''}
            </span>
          </div>
          <div>
            <label>Language: </label>
            <span>{book.language}</span>
          </div>
          <div>
            <label>Number of pages: </label>
            <span>{book.numberOfPages}</span>
          </div>
          <div>
            <label>Price: </label>
            <span>${book.price}</span>
          </div>
          <div>
            <label>Library: </label>
            <span>{book.library ? book.library['name'] : ''}</span>
            <div>
              <span>{book.library ? book.library['streetAddress'] : ''}</span>
              <p> {book.library ? book.library['city'] : ''}</p>
              <p>{book.library ? book.library['zipcode'] : ''}</p>
              <p>{book.library ? book.library['country'].toUpperCase() : ''}</p>
            </div>
            <div>
              <label>ISBN: </label>
              <span>{book.isbn}</span>
            </div>
            <div>
              {' '}
              <label>Rack number: </label>
              <span>{book.rack ? book.rack['number'] : ''}</span>
            </div>
            <div>
              {' '}
              <label>Rack location: </label>
              <span>{book.rack ? book.rack['location'] : ''}</span>
            </div>
          </div>

          {/* <p>{book.author.name}</p> */}
          <button
            className='blue-button'
            onClick={() => {
              window.location = '/books';
            }}
          >
            Go back
          </button>
        </div>
      </div>
    );
  } else {
    return <p>You don't have access to this resource</p>;
  }
}
