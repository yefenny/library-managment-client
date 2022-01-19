import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookService from '../Services/BookService';

function Books() {
  
  return (
    <div className='books-container bg-books'>
      <header>
        <h2>Books</h2>
        <p>Star enjoing your favorites books.</p>
      </header>

      <div className='searchContainer'>
        {/* <label htmlFor='searchBy'>Search: </label> */}
        <input
          type='text'
          id='searchBy'
          name='searchBy'
          placeholder='Search by title, author, subject category and publication date'
        />
      </div>
      <div className='books-list-container'>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='book'>
          <div className='container'>
            <div className='card'>
              <div className='bkg'></div>
              <div className='info'>
                <h1>Book 1</h1>
                <h3>Author</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Books;
