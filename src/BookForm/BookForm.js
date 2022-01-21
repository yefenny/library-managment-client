import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';

function BookForm() {
  // const [form, setForm] = useState({
  //   barcode: '',
  //   number: '',
  //   libraryName: '',
  //   rack: '',
  //   location: '',
  //   title: '',
  //   publisher: '',
  //   language: '',
  //   numberOfPages: '',
  //   authorName: '',
  //   subjectNames: '',
  //   format: '',
  //   publicationDate: '',
  //   price: '',
  //   referenceOnly: false,
  //   isbn: '',
  //   libraries: []
  // });

  if (AccountService.getUserType() === 'LIBRARIAN') {
    return (
      <div className='book-form-bg'>
        <div className='book-form'></div>
        <form></form>
      </div>
    );
  } else {
    return <h3>You dont have access to this resource</h3>;
  }
}
export default BookForm();
