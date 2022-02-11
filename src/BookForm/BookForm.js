import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { format as dateFormat } from 'date-fns';
import AccountService from '../Services/AccountService';
import AuthorService from '../Services/AuthorService';
import BookService from '../Services/BookService';
import LibraryService from '../Services/LibraryService';
import SubjectService from '../Services/SubjectService';
import { useLocation } from 'react-router-dom';
import de from 'date-fns/esm/locale/de/index.js';

function BookForm() {
  const [library, setLibrary] = useState('');
  const [rack, setRack] = useState(0);
  const [location, setLocation] = useState('');
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [language, setLanguage] = useState('');
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [author, setAuthor] = useState('');
  const [subjectNames, setSubjectNames] = useState([]);
  const [subject, setSubject] = useState('');
  const [format, setFormat] = useState('HARDCOVER');
  const [publicationDate, setPublicationDate] = useState(
    dateFormat(new Date(), 'yyyy-MM-dd')
  );
  const [price, setPrice] = useState(0);
  const [referenceOnly, setReferenceOnly] = useState(false);
  const [error, setError] = useState('');
  const [libraries, setLibraries] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const usLocation = useLocation();
  const { state } = usLocation;

  useEffect(() => {
    let isCancelled = false;
    LibraryService.getAllLibrary().then((res) => {
      if (!isCancelled) {
        setLibraries(res);
        setLibrary(res[0].name);
      }
    });
    AuthorService.getAuthors().then((res) => {
      if (!isCancelled) {
        setAuthors(res);
        setAuthor(res[0].name);
      }
    });
    SubjectService.getAllSubject().then((res) => {
      if (!isCancelled) {
        setSubjects(res);
        setSubject(res[0].name);
      }
    });
    if (state) {
      setIsbn(state.book.isbn);
      setTitle(state.book.title);
      setPublisher(state.book.publisher);
      setLanguage(state.book.language);
      setNumberOfPages(state.book.numberOfPages);
      setAuthor(state.book.author);
      setFormat(state.book.format);
      setPublicationDate(state.book.publicationDate);
      setPrice(state.book.price);
      setReferenceOnly(state.book.referenceOnly);
      setIsUpdate(true);
      setRack(state.book.rack.number);
      setLocation(state.book.rack.location);
      setLibrary(state.book.library.name);
      const oldSubject = [];
      for (let i = 0; i < state.book.subjects.length; i++) {
        oldSubject.push(state.book.subjects[i].name);
      }
      setSubjectNames(oldSubject);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const subjectlist = () => {
    let string = '';
    for (let i = 0; i <= subjectNames.length; i++) {
      if (i < subjectNames.length - 1) string += `${subjectNames[i]}, `;
      else if (i === subjectNames.length - 1) string += `${subjectNames[i]}`;
    }
    return string;
  };
  const addSubject = () => {
    if (!subjectNames.includes(subject))
      setSubjectNames([...subjectNames, subject]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const stringToCheck = {
      title,
      language,
      location,
      publisher,
      isbn
    };
    for (const [key, value] of Object.entries(stringToCheck)) {
      if (value.trim().length < 1) {
        setError(`${key} is required`);
        return;
      }
    }
    const numbersToCheck = {
      numberOfPages,
      price,
      rack
    };
    for (const [key, value] of Object.entries(numbersToCheck)) {
      if (value < 0) {
        setError(`${key} should be equal or greater than 0 `);
        return;
      }
    }
    const newBook = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      libraryName: library,
      rack,
      location,
      isbn,
      title,
      publisher,
      language,
      numberOfPages,
      author,
      subjectNames,
      format,
      publicationDate,
      price,
      referenceOnly
    };
    if (isUpdate) {
      delete newBook.rack;
      delete newBook.location;
      newBook.bookBarcode = state.book.barcode;
      BookService.updateBook(newBook)
        .then((res) => {
          // console.log(res);
          window.location = '/books';
        })
        .catch((error) => {
          console.log(error);
        });
    } else
      BookService.addBooks(newBook)
        .then((res) => {
          // console.log(res);
          window.location = '/books';
        })
        .catch((error) => {
          console.log(error);
        });
  };

  if (AccountService.getUserType() === 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='add-form'>
          <h2>{state ? 'Update Book' : 'New Book'}</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
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
              required
            />
            <label htmlFor='author'>Author:</label>
            <select
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            >
              {BookService.createOptions(authors, 'name')}
            </select>
            <div className='subject-div'>
              <label htmlFor='subject'>Subjects:</label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              >
                {BookService.createOptions(subjects, 'name')}
              </select>
              <button
                type='button'
                onClick={() => {
                  addSubject();
                }}
              >
                Add subject
              </button>
              <button
                type='button'
                onClick={() => {
                  setSubjectNames([]);
                }}
              >
                Clear subjects
              </button>
              <div>
                <span>Selected subjects:</span>
                <p>{subjectlist()}</p>
              </div>
            </div>

            <label htmlFor='language'>Language:</label>
            <input
              type='text'
              id='language'
              name='language'
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
              required
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
              required
            />
            <label htmlFor='numberOfPages'>Number of pages:</label>
            <input
              type='text'
              pattern='[0-9]*'
              id='numberOfPages'
              name='numberOfPages'
              min='0'
              value={numberOfPages}
              onChange={(e) => {
                let value =
                  e.target.validity.valid || e.target.value === ''
                    ? e.target.value
                    : numberOfPages;
                setNumberOfPages(value);
              }}
              required
            />
            <label htmlFor='price'>Price:</label>
            <input
              type='text'
              pattern='[0-9]*'
              id='price'
              name='price'
              min='0'
              value={price}
              onChange={(e) => {
                let value =
                  e.target.validity.valid || e.target.value === ''
                    ? e.target.value
                    : price;
                setPrice(value);
              }}
              required
            />
            <label htmlFor='libraryName'>Library:</label>
            <select
              value={library}
              onChange={(e) => {
                setLibrary(e.target.value);
              }}
            >
              {BookService.createOptions(libraries, 'name')}
            </select>
            <label htmlFor='rack'>Rack:</label>
            <input
              type='text'
              id='rack'
              name='rack'
              pattern='[0-9]*'
              value={rack}
              disabled={isUpdate}
              onChange={(e) => {
                let value =
                  e.target.validity.valid || e.target.value === ''
                    ? e.target.value
                    : rack;
                setRack(value);
              }}
              required
            />
            <label htmlFor='location'>Location:</label>
            <input
              type='text'
              id='location'
              name='location'
              value={location}
              disabled={isUpdate}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
            />
            <label htmlFor='location'>Format:</label>
            <select
              value={format}
              onChange={(e) => {
                setFormat(e.target.value);
              }}
            >
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
              required
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
              required
            />
            <label htmlFor='location'>For reference only :</label>
            <select
              value={referenceOnly}
              onChange={(e) => {
                setReferenceOnly(e.target.value);
              }}
            >
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
