import { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LibraryService from '../Services/LibraryService';
import Modal from '../Modal/Modal';
import AccountService from '../Services/AccountService';

export default class LibrariesList extends Component {
  state = {
    modalIsOpen: false,
    libraryTodelete: ''
  };
  setModalOpen = (val) => {
    this.setState({ modalIsOpen: val });
  };
  setConfirm = (val) => {
    this.setState({ confirm: val });
  };
  deleteLibray = () => {
    this.setState({ modalIsOpen: false });
    if (this.state.libraryTodelete) {
      const toDelete = {
        barcode: AccountService.getBarcode(),
        number: AccountService.getCardNumber(),
        library: this.state.libraryTodelete
      };
      LibraryService.deleteLibrary(toDelete)
        .then((res) => {
          window.location.reload(true);
        })
        .catch((error) => {
          this.props.setError(error.message.message);
        });
    }
  };
  render() {
    return (
      <ul>
        {this.props.libraries.map((val, i) => {
          const link = `/library/${val.name}`;
          return (
            <li key={i}>
              <Link to={link} state={{ library: val }}>
                {val.name}
              </Link>
              <button
                className='delete-button'
                onClick={() => {
                  this.setModalOpen(true);
                  this.setState({ libraryTodelete: val.name });
                  this.props.setError('');
                }}
              >
                Remove
              </button>{' '}
              <Modal
                setModal={this.setModalOpen}
                text={`Are you sure you want to delete ${val.name}`}
                modalIsOpen={this.state.modalIsOpen}
                deleteFunction={this.deleteLibray}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}
