import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LibrariesList from '../LibrariesList/LibrariesList';
import Modal from '../Modal/Modal';
import AccountService from '../Services/AccountService';
import LibraryService from '../Services/LibraryService';

class Libraries extends Component {
  state = {
    libraries: [],
    error: '',
    searchTerm: ''
  };
  componentDidMount() {
    LibraryService.getAllLibrary().then((libraries) => {
      this.setState({ libraries });
    });
    if (
      !AccountService.getCardNumber() ||
      !AccountService.getBarcode() ||
      AccountService.getUserType() !== 'LIBRARIAN'
    ) {
      window.location = 'login';
    }
  }
  editSearchValue = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  dynamicSearch = () => {
    return this.state.libraries.filter((val) =>
      val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };
  render() {
    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Libraries</h2>
        </header>

        <div className='searchContainer'>
          {/* <label htmlFor='searchBy'>Search: </label> */}
          <button
            className='addBook'
            onClick={() => {
              window.location = '/new/library';
            }}
          >
            {' '}
            + Add Library
          </button>
          <input
            type='text'
            id='searchBy'
            name='searchBy'
            placeholder='Search by title'
            value={this.state.searchTerm}
            onChange={this.editSearchValue}
            autocomplete='off'
          />
        </div>
        <div className='list-item remove-border'>
          <LibrariesList libraries={this.dynamicSearch()} />
        </div>
      </div>
    );
  }
}
export default Libraries;
