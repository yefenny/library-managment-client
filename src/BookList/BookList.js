import { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LibraryService from '../Services/LibraryService';
import Modal from '../Modal/Modal';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';
import BorrowButton from '../BorrowButton/BorrowButton';
import ReturnButton from '../ReturnButton/ReturnButton';
import RenewButton from '../RenewButton/RenewButton';

export default function BookList({ books, setError }) {
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [bookTodelete, setBookToDelete] = useState('');
  const [isLibrarian, setIsLibrarian] = useState(false);

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
  const bookIsBorrowed = async (book) => {
    let borrowed = [];

    const founded = await BookService.getCheckoutBooks({
      barcode: AccountService.getBarcode(),
      card: AccountService.getCardNumber()
    }).then((res) => {
      borrowed = [...res];
      const found = borrowed.find((val) => val.barcode === book.barcode);
      return found ? true : false;
    });
    return founded;
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
      return (
        <>
          {val.status === 'AVAILABLE' && (
            <BorrowButton
              book={val}
              color={'blue-button'}
              setError={setError}
            />
          )}
          {val.status === 'LOANED' && bookIsBorrowed(val) && (
            <ReturnButton book={val} color={'blue-button'} setError={setError} />
          )}
          {val.status === 'LOANED' && bookIsBorrowed(val) && (
            <RenewButton book={val} color={'blue-button'} setError={setError}/>
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
