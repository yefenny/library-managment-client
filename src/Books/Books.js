import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Books() {
  return (
    <div className='books-container bg-books'>
      <header>
        <h2>Books</h2>
      </header>

      <div className='searchContainer'>
        <label htmlFor='searchBy'>Search: </label>
        <input type='text' id='searchBy' name='searchBy' />
      </div>
      <div className='books-list-container'>
        <div className='book book-item'>
          {' '}
          <h3>The book number 1</h3>
          <span className='book-author'>Name lastname</span>
          {/* <Link to='/'>Book number 1</Link> */}
        </div>
        <div className='book book-item'>
          {' '}
          <h3>The book number 2</h3>
          <span className='book-author'>Name lastname</span>
        </div>
        <div className='book book-item green-book'>
          {' '}
          <h3>The book number 3</h3>
          <span className='book-author'>Name lastname</span>
        </div>
        <div className='book book-item orange-book'>
          {' '}
          <h3>The book number 4</h3>
          <span className='book-author'>Name lastname</span>
        </div>
        <div className='book book-item blue-book'>
          {' '}
          <h3>The book number 5</h3>
          <span className='book-author'>Name lastname</span>
        </div>
      </div>
    </div>
  );
}
export default Books;
