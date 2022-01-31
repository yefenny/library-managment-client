import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import AuthorService from '../Services/AuthorService';

function AuthorForm() {
  const [authorForm, setAuthorForm] = useState({
    author: '',
    error: ''
  });
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state) setAuthorForm({ error: '', author: state.author.name });
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthorForm({ ...authorForm, error: '' });
    if (authorForm.author.trim().length < 1) {
      setAuthorForm({ ...authorForm, error: 'Author is required' });
      return;
    }
    AuthorService.createAuthor({
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      author: authorForm.author
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setAuthorForm({ ...authorForm, error: 'Author already exist' });
      });
  };
  if (AccountService.getUserType() === 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='add-form'>
          <h2>{state ? 'Update Author' : 'New Author'}</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className='error'>{authorForm.error}</div>
            <label htmlFor='author'>Author:</label>
            <input
              type='text'
              id='author'
              name='author'
              value={authorForm.author}
              placeholder='Insert author full name'
              onChange={(e) => {
                setAuthorForm({ ...authorForm, author: e.target.value });
              }}
            ></input>
            <label htmlFor='author'>Description:</label>
            <input
              type='text'
              id='author'
              name='author'
              value={authorForm.author}
              placeholder='Any desired description..'
              onChange={(e) => {
                setAuthorForm({ ...authorForm, author: e.target.value });
              }}
            ></input>
            <button type='submit' className='add-button'>Save</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3> You don't have access to this resource</h3>
      </div>
    );
  }
}
export default AuthorForm;
