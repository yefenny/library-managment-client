import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { format as dateFormat } from 'date-fns';
import AccountService from '../Services/AccountService';
import AuthorService from '../Services/AuthorService';
import BookService from '../Services/BookService';
import LibraryService from '../Services/LibraryService';
import SubjectService from '../Services/SubjectService';

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
  const [library, setLibrary] = useState('');
  const [rack, setRack] = useState(0);
  const [location, setLocation] = useState('');
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [language, setLanguage] = useState('');
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [subjectNames, setSubjectNames] = useState([]);
  const [format, setFormat] = useState([]);
  const [publicationDate, setPublicationDate] = useState(
    dateFormat(new Date(), 'yyyy-MM-dd')
  );
  const [price, setPrice] = useState(0);
  const [referenceOnly, setReferenceOnly] = useState(false);
  const [error, setError] = useState('');
  const [libraries, setLibraries] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    LibraryService.getAllLibrary().then((res) => {
      if (!isCancelled) setLibraries(res);
    });
    AuthorService.getAuthors().then((res) => {
      if (!isCancelled) setAuthors(res);
    });
    SubjectService.getAllSubject().then((res) => {
      if (!isCancelled) setSubjects(res);
    });

    return () => {
      isCancelled = true;
    };
  }, [libraries, authors]);

  const disableDate = () => {
    // return false;
  };

  if (AccountService.getUserType() === 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='add-form'>
          <h2>New Book</h2>
          <form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <div className='error'>{error}</div>
            <label htmlFor='libraryName'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor='author'>Author:</label>
            <select>{BookService.createOptions(authors, 'name')}</select>
            <label htmlFor='subject'>Subjects:</label>
            <select>{BookService.createOptions(subjects, 'name')}</select>

            <label htmlFor='language'>Language:</label>
            <input
              type='text'
              id='language'
              name='language'
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            />
            <label htmlFor='publicationDate'>Publication date:</label>
            <input
              type='date'
              id='publicationDate'
              name='publicationDate'
              value={publicationDate}
              max={dateFormat(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => {
                setPublicationDate(e.target.value);
              }}
            />
            <label htmlFor='numberOfPages'>Number of pages:</label>
            <input
              type='number'
              id='numberOfPages'
              name='numberOfPages'
              min='0'
              value={numberOfPages}
              onChange={(e) => {
                setNumberOfPages(e.target.value);
              }}
            />
            <label htmlFor='price'>Price:</label>
            <input
              type='number'
              id='price'
              name='price'
              min='0'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <label htmlFor='libraryName'>Library:</label>
            <select>{BookService.createOptions(libraries, 'name')}</select>
            <label htmlFor='rack'>Rack:</label>
            <input
              type='text'
              id='rack'
              name='rack'
              value={rack}
              onChange={(e) => {
                setRack(e.target.value);
              }}
            />
            <label htmlFor='location'>Location:</label>
            <input
              type='text'
              id='location'
              name='location'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <label htmlFor='location'>Format:</label>
            <select>
              <option value='HARDCOVER'>Hardcover</option>
              <option value='PAPERBACK'>Paperback</option>
              <option value='AUDIO_BOOK'>Audio book</option>
              <option value='EBOOK'>Ebook</option>
              <option value='NEWSPAPER'>Newspaper</option>
              <option value='MAGAZINE'>Magazine</option>
              <option value='JOURNAL'>Journal</option>
            </select>
            <label htmlFor='publisher'>Publisher:</label>
            <input
              type='text'
              id='publisher'
              name='publisher'
              value={publisher}
              onChange={(e) => {
                setPublisher(e.target.value);
              }}
            />
            <label htmlFor='isbn'>ISBN:</label>
            <input
              type='text'
              id='isbn'
              name='isbn'
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
            />
            <label htmlFor='location'>For reference only :</label>
            <select>
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
            <button type='submit' className='add-button'>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <h3>You dont have access to this resource</h3>;
  }
}
export default BookForm;
