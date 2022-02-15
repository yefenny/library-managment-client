import './assets/style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './Signup/SignUp';
import LogIn from './Login/Login';
import Books from './Books/Books';
import SignUpComplete from './Signup/SignUpComplete';
import AccountService from './Services/AccountService';
import BookForm from './BookForm/BookForm';
import SubjectForm from './SubjectForm/SubjectForm';
import Subjects from './Subjects/Subjects';
import Libraries from './Libraries/Libraries';
import LibraryForm from './LibraryForm/LibraryForm';
import Library from './Library/Library';
import Authors from './Authors/Authors';
import Author from './Author/Author';
import AuthorForm from './AuthorForm/AuthorForm';
import Book from './Book/Book';
import { createContext, useMemo, useState } from 'react';
import { MemberContext } from './Context/MemberContext';
import Borrows from './Borrows/Borrows';

function App() {
  // const memberContext = createContext({
  //   memberCheckout: ['member 1', 'member 2'],
  //   setMemberCheckout: () => {}
  // });
  const [memberCheckout, setMemberCheckout] = useState(['', '']);
  const value = useMemo(
    () => ({ memberCheckout, setMemberCheckout }),
    [memberCheckout]
  );
  const navBar = () => {
    if (AccountService.getCardNumber() === null) {
      return (
        <nav>
          <Link to='/login'>Log in</Link>
          <Link to='/signup'>Sign Up</Link>
        </nav>
      );
    } else
      return (
        <nav>
          {AccountService.getUserType() === 'LIBRARIAN' && (
            <Link to='/libraries'>Libraries</Link>
          )}
          {AccountService.getUserType() === 'LIBRARIAN' && (
            <Link to='/authors'>Authors</Link>
          )}
          {AccountService.getUserType() === 'LIBRARIAN' && (
            <Link to='/subjects'>Subjects</Link>
          )}

          {(AccountService.getUserType() === 'LIBRARIAN' ||
            AccountService.getUserType() === 'MEMBER') && (
            <Link to='/books'> Books</Link>
          )}
          {AccountService.getUserType() === 'MEMBER' && (
            <Link to='/loans'> Loans</Link>
          )}
          <Link
            to=''
            onClick={() => {
              window.location = '/login';
              AccountService.clearUser();
            }}
          >
            Sign out
          </Link>
        </nav>
      );
  };
  return (
    <Router>
      <header>
        <h1>NGT Library System Manager</h1>
        {navBar()}
      </header>
      <main className='App'>
        <MemberContext.Provider value={value}>
          <Routes>
            <Route exact path='/' element={<Books />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/libraries' element={<Libraries />} />
            <Route exact path='/new/book' element={<BookForm />} />
            <Route exact path='/new/subject' element={<SubjectForm />} />
            <Route path='subjects' element={<Subjects />} />
            <Route exact path='/new/library' element={<LibraryForm />} />
            <Route path='/library/:name' element={<Library />} />
            <Route path='authors' element={<Authors />} />
            <Route path='/author/:name' element={<Author />} />
            <Route path='/book/:barcode' element={<Book />} />
            <Route exact path='/new/author' element={<AuthorForm />} />
            <Route exact path='/update/author/:name' element={<AuthorForm />} />
            <Route exact path='/update/book/:barcode' element={<BookForm />} />
            <Route path='/welcome' element={<SignUpComplete />} />

            <Route path='/login' element={<LogIn />} />

            <Route path='/books' element={<Books />}></Route>
            <Route path='/loans' element={<Borrows />}></Route>
          </Routes>
        </MemberContext.Provider>
      </main>
    </Router>
  );
}

export default App;
