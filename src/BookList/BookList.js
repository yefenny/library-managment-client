import { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LibraryService from '../Services/LibraryService';
import Modal from '../Modal/Modal';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';
import BorrowButton from '../BorrowButton/BorrowButton';
import ReturnButton from '../ReturnButton/ReturnButton';
import RenewButton from '../RenewButton/RenewButton';
import AlertModal from '../AlertModal/AlertModal';
import ReserveButton from '../ReserveButton/ReserveButton';
import CancelReserveButton from '../CancelReserveButton/CancelReserveButton';

export default function BookList({ books, setError, setAlert }) {
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [bookTodelete, setBookToDelete] = useState('');
  const [isLibrarian, setIsLibrarian] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    BookService.getCheckoutBooks({
      barcode: AccountService.getBarcode(),
      card: AccountService.getCardNumber()
    }).then((res) => {
      if (!isCancelled) {
        setBorrowedBooks(res);
      }
    });

    BookService.getReservedBooks({
      barcode: AccountService.getBarcode(),
      card: AccountService.getCardNumber()
    }).then((res) => {
      if (!isCancelled) setReservedBooks(res);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const setModalOpen = (val) => {
    setModelIsOpen(val);
  };

  const deleteBook = () => {
    setModelIsOpen(false);

    if (bookTodelete) {
      const toDelete = {
        barcode: AccountService.getBarcode(),
        number: AccountService.getCardNumber(),
        bookBarcode: bookTodelete
      };
      BookService.deleteBook(toDelete)
        .then((res) => {
          console.log(res);
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const bookIsBorrowed = (book) => {
    let borrowed = [];
    let error;
    var founded = [];

    if (borrowedBooks) {
      founded = borrowedBooks.find((val) => val.barcode === book.barcode);
      if (founded) return true;
      else {
        return false;
      }
    }
    return false;
  };
  const bookIsReserved = (book) => {
    let borrowed = [];
    let error;
    var founded = [];

    if (bookIsReserved) {
      founded = reservedBooks.find((val) => val.barcode === book.barcode);
      if (founded) return true;
      else {
        return false;
      }
    }
    return false;
  };

  const renderButtons = (val) => {
    if (AccountService.getUserType() === 'LIBRARIAN') {
      return (
        <>
          <Link to={`/update/book/${val.barcode}`} state={{ book: val }}>
            <button
              className='yellow-button'
              onClick={() => {
                // setModalOpen(true);
                // setAuthorToDelete(val.name);
              }}
            >
              Edit
            </button>{' '}
          </Link>
          <Link to=''>
            <button
              className='delete-button'
              onClick={() => {
                setModalOpen(true);
                setBookToDelete(val.barcode);
              }}
            >
              Remove
            </button>{' '}
          </Link>
          <Modal
            setModal={setModalOpen}
            text={`Are you sure you want to delete ${val.name}`}
            modalIsOpen={modalIsOpen}
            deleteFunction={deleteBook}
          />
        </>
      );
    } else if (AccountService.getUserType() === 'MEMBER') {
      const isBorrowed = bookIsBorrowed(val);
      const isReserved = bookIsReserved(val);
      return (
        <>
          {val.status === 'AVAILABLE' && (
            <BorrowButton
              book={val}
              color={'blue-button'}
              setError={setError}
              setAlert={setAlert}
            />
          )}
          {val.status === 'LOANED' && isBorrowed && (
            <ReturnButton
              book={val}
              color={'blue-button'}
              setError={setError}
              setAlertText={setAlertText}
            />
          )}
          {val.status === 'LOANED' && !isBorrowed && !isReserved && (
            <ReserveButton
              book={val}
              color={'blue-button'}
              setError={setError}
              setAlertText={setAlertText}
            />
          )}
          {val.status === 'LOANED' && !isBorrowed && isReserved && (
            <CancelReserveButton
              book={val}
              color={'blue-button'}
              setError={setError}
              setAlertText={setAlertText}
            />
          )}
          {val.status === 'LOANED' && isBorrowed && (
            <RenewButton book={val} color={'blue-button'} setError={setError} />
          )}
          <Modal
            setModal={setModalOpen}
            text={`Are you sure you want to delete ${val.name}`}
            modalIsOpen={modalIsOpen}
            deleteFunction={deleteBook}
          />
        </>
      );
    }
  };

  return (
    <>
      {books.map((val, i) => {
        const link = `/book/${val.barcode}`;
        return (
          <div className='book-item' key={i}>
            <Link to={link} state={{ book: val }}>
              <div className='book'>
                <div className='container'>
                  <div className='card'>
                    <div className='bkg'></div>
                    <div className='info'>
                      <h1>{val.title}</h1>
                      <h3>{val.author.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className='books-buttons'>{renderButtons(val)}</div>
          </div>
        );
      })}
    </>
  );
}
