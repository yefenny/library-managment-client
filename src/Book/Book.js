import { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import BorrowButton from '../BorrowButton/BorrowButton';
import CancelReserveButton from '../CancelReserveButton/CancelReserveButton';
import RenewButton from '../RenewButton/RenewButton';
import ReserveButton from '../ReserveButton/ReserveButton';
import ReturnButton from '../ReturnButton/ReturnButton';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function Book() {
  const [book, setBook] = useState({});
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  let navigate = useNavigate();

  const { barcode } = useParams();

  useEffect(() => {
    let isCancelled = false;
    BookService.getBooks().then((res) => {
      if (!isCancelled) {
        setBooks(res);
        let newBook = res.find((val) => val.barcode === Number(barcode));
        setBook(newBook);
      }
    });

    BookService.getCheckoutBooks({
      barcode: AccountService.getBarcode(),
      card: AccountService.getCardNumber()
    }).then((res) => {
      if (!isCancelled) {
        setBorrowedBooks(res);
      }
    });
    if (!isCancelled)
      BookService.getReservedBooks({
        barcode: AccountService.getBarcode(),
        card: AccountService.getCardNumber()
      })
        .then((res) => {
          if (!isCancelled)
            if (res) {
              setReservedBooks(res);
            }
        })
        .catch((error) => {
          console.log(error);
        });
    return () => {
      isCancelled = true;
    };
  }, []);

  const memberButtons = (val) => {
    if (AccountService.getUserType() === 'MEMBER') {
      const isBorrowed = BookService.bookIsBorrowed(val, borrowedBooks);
      const isReserved = BookService.bookIsReserved(val, reservedBooks);
      return (
        <>
          {val.status === 'AVAILABLE' && (
            <BorrowButton book={val} color={'blue-button'} />
          )}
          {val.status === 'LOANED' && isBorrowed && (
            <ReturnButton book={val} color={'blue-button'} />
          )}
          {val.status === 'LOANED' && !isBorrowed && !isReserved && (
            <ReserveButton book={val} color={'blue-button'} />
          )}
          {(val.status === 'LOANED' || val.status === 'RESERVED') &&
            !isBorrowed &&
            isReserved && (
              <CancelReserveButton book={val} color={'blue-button'} />
            )}
          {val.status === 'RESERVED' && isReserved && (
            <BorrowButton book={val} color={'blue-button'} />
          )}
          {val.status === 'LOANED' && isBorrowed && (
            <RenewButton book={val} color={'blue-button'} />
          )}
        </>
      );
    }
  };

  if (
    AccountService.getUserType() === 'LIBRARIAN' ||
    AccountService.getUserType() === 'MEMBER'
  ) {
    return (
      <div className='form-background'>
        <div className='view-item view-book'>
          <h2>{book && book.title}</h2>
          <div>
            <label>Format: </label>
            <span>{book && book.format}</span>
          </div>
          <div>
            <label>Author: </label>
            <span>{book && (book.author ? book.author.name : '')}</span>
          </div>
          <div>
            <label>Publisher: </label>
            <span>{book && book.publisher}</span>
          </div>
          <div>
            <label>Subjects: </label>
            <span>
              {book &&
                (book.subjects
                  ? BookService.createSubjectsList(book.subjects)
                  : '')}
            </span>
          </div>
          <div>
            <label>Publication Date: </label>
            <span>{book && book.publicationDate}</span>
          </div>
          <div>
            <label>Language: </label>
            <span>{book && book.language}</span>
          </div>
          <div>
            <label>Number of pages: </label>
            <span>{book && book.numberOfPages}</span>
          </div>
          <div>
            <label>Price: </label>
            <span> {book && book.price}</span>
          </div>
          <div>
            <label>Library: </label>
            <span>{book && (book.library ? book.library['name'] : '')}</span>
            <div>
              <span>
                {book && (book.library ? book.library['streetAddress'] : '')}
              </span>
              <p> {book && (book.library ? book.library['city'] : '')}</p>
              <p>{book && (book.library ? book.library['zipcode'] : '')}</p>
              <p>
                {book &&
                  (book.library ? book.library['country'].toUpperCase() : '')}
              </p>
            </div>
            <div>
              <label>ISBN: </label>
              <span>{book && book.isbn}</span>
            </div>
            <div>
              {' '}
              <label>Rack number: </label>
              <span>{book && (book.rack ? book.rack['number'] : '')}</span>
            </div>
            <div>
              {' '}
              <label>Rack location: </label>
              <span>{book && (book.rack ? book.rack['location'] : '')}</span>
            </div>
          </div>

          {/* <p>{book.author.name}</p> */}
          {book && memberButtons(book)}

          <button
            className='blue-button'
            onClick={() => {
              navigate(-1);
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
