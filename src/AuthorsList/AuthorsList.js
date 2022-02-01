import { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LibraryService from '../Services/LibraryService';
import Modal from '../Modal/Modal';
import AccountService from '../Services/AccountService';
import AuthorService from '../Services/AuthorService';

export default function AuthorList({ authors }) {
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState('');

  const setModalOpen = (val) => {
    setModelIsOpen(val);
  };

  const deleteLibray = () => {
    setModelIsOpen(false);

    if (authorToDelete) {
      const toDelete = {
        barcode: AccountService.getBarcode(),
        number: AccountService.getCardNumber(),
        author: authorToDelete
      };
      AuthorService.deleteAuthor(toDelete)
        .then((res) => {
          console.log(res);
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <ul className='white-list'>
      {authors.map((val, i) => {
        const link = `/author/${val.name}`;
        return (
          <li key={i}>
            <Link to={link} state={{ author: val }}>
              {val.name}
            </Link>
            <Link to={`/update/author/${val.name}`}state={{ author: val }}>
              <button
                className='yellow-button'
                onClick={() => {
                  setModalOpen(true);
                  setAuthorToDelete(val.name);
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
                  setAuthorToDelete(val.name);
                }}
              >
                Remove
              </button>{' '}
            </Link>

            <Modal
              setModal={setModalOpen}
              text={`Are you sure you want to delete ${val.name}`}
              modalIsOpen={modalIsOpen}
              deleteFunction={deleteLibray}
            />
          </li>
        );
      })}
    </ul>
  );
}
