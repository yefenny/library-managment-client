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

function App() {
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
            <Link to='/subjects'>Subjects</Link>
          )}
          {(AccountService.getUserType() === 'LIBRARIAN' ||
            AccountService.getUserType() === 'MEMBER') && (
            <Link to='/books'> Books</Link>
          )}
          <Link to='/login' onClick={AccountService.clearUser}>
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
      <main>
        <Routes>
          <Route exact path='/'></Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/welcome' element={<SignUpComplete />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/books' element={<Books />} />
          <Route exact path='/new/book' element={<BookForm />} />
          <Route exact path='/new/subject' element={<SubjectForm />} />
          <Route path='subjects' element={<Subjects />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
