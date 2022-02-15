import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from '../BookList/BookList';
import { MemberContext } from '../Context/MemberContext';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

function Borrows() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { memberCheckout } = useContext(MemberContext);
  const { error, setNewError } = useState('');
  const { alert, setAlert } = useState('');

  useEffect(() => {
    BookService.getCheckoutBooks({
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
    // const dynamicSearch = () => {
    //   return books.filter(filterFunction);
    // };
    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Borrowed books</h2>
          <p>Manage your loans</p>
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
export default Borrows;
