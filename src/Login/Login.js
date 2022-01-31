import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import MemberService from '../Services/MemberService';
function LogIn() {
  const [formData, setFormData] = useState({
    libraryCard: '',
    password: '',
    error: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, error: '' });
    const { libraryCard, password } = formData;
    const required = { libraryCard, password };
    for (const [key, value] of Object.entries(required)) {
      if (value.trim().length < 1) {
        setFormData({ ...formData, error: `${key} is required` });
        return;
      }
    }
    const login = {
      libraryCardNumber: libraryCard,
      password
    };
    MemberService.logIn(login)
      .then((res) => {
        AccountService.storeUser(res);
        window.location = '/books';
      })
      .catch((err) => {
        setFormData({
          ...formData,
          error: 'Invalid library card number or password'
        });
      });
  };
  return (
    <div className='sign-up-container '>
      <div className='bg-library'>Image by rawpixel.com</div>
      <div className='sign-up-form'>
        <h1>Log in</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='error'>{formData.error}</div>
          <label htmlFor='libraryCard'>Library card:</label>
          <input
            required
            type='text'
            id='libraryCard'
            name='libraryCard'
            onChange={(e) => {
              setFormData({ ...formData, libraryCard: e.target.value });
            }}
            value={formData.libraryCard}
          />
          <label htmlFor='password'>Password:</label>
          <input
            required
            type='password'
            id='password'
            name='password'
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            value={formData.password}
          />
          <button>Log in</button>
          <span className='login-create'>
            Don't have an account? <Link to='/signup'> Create Account</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
export default LogIn;
