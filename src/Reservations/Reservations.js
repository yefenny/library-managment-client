import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from '../BookList/BookList';
import { MemberContext } from '../Context/MemberContext';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

function Reservations() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { memberCheckout } = useContext(MemberContext);
  const { error, setNewError } = useState('');
  const { alert, setAlert } = useState('');

  useEffect(() => {
    BookService.getReservedBooks({
      barcode: AccountService.getBarcode(),
      card: AccountService.getCardNumber()
    }).then((res) => {
      setBooks(res);
    });
  }, []);

  const setErrorValue = (values) => {
    setNewError(values);
  };

  if (!AccountService.getCardNumber() && !AccountService.getBarcode()) {
    window.location = 'login';
  } else {
    
    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Reserved books</h2>
          <p>Manage your reservations</p>
        </header>

        <div className='error'>{error}</div>
        <div className='alert'>{alert}</div>
        <div className='books-list-container loan-list'>
          {
            <BookList
              books={books}
              setError={setErrorValue}
              setAlert={setAlert}
            />
          }
        </div>
      </div>
    );
  }
}
export default Reservations;
