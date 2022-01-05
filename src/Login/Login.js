import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
function LogIn() {
  const [formData, setFormData] = useState({
    libraryCard: '',
    password: ''
  });
  return (
    <div className='sign-up-container '>
      <div className='bg-library'>Image by rawpixel.com</div>
      <div className='sign-up-form'>
        <h1>Log in</h1>
        <form>
          <label htmlFor='libraryCard'>Library card:</label>
          <input
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
            type='text'
            id='password'
            name='password'
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            value={formData.password}
          />
          <button>Create</button>
          <span className='login-create'>
            Don't have an account? <Link to='/signup'> Create Account</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
export default LogIn;
