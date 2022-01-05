import './assets/style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './Signup/SignUp';
import LogIn from './Login/Login';

function App() {
  return (
    <Router>
      <header>
        <h1>NGT Library System Manager</h1>
        <nav>
          <Link to='/login'>Log in</Link>
          <Link to='/signup'>Sign Up</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route exact path='/'></Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
