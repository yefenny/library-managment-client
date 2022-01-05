import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: ''
  });
  return (
    <div className='sign-up-container '>
      <div className='bg-library'>Image by rawpixel.com</div>
      <div className='sign-up-form'>
        <h1>Create Account</h1>
        <form>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            value={formData.name}
          />
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            name='email'
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            value={formData.email}
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
          <label htmlFor='repeatPassword'>Repeat password:</label>
          <input
            type='text'
            id='repeatPassword'
            name='repeatPassword'
            onChange={(e) => {
              setFormData({ ...formData, repeatPassword: e.target.value });
            }}
            value={formData.repeatPassword}
          />
          <label htmlFor='streetAddress'>Street address:</label>
          <input
            type='text'
            id='streetAddress'
            name='streetAddress'
            onChange={(e) => {
              setFormData({ ...formData, streetAddress: e.target.value });
            }}
            value={formData.streetAddress}
          />
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            id='city'
            name='city'
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
            value={formData.city}
          />
          <label htmlFor='state'>State:</label>
          <input
            type='text'
            id='state'
            name='state'
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
            value={formData.state}
          />
          <label htmlFor='zipcode'>ZIP Code:</label>
          <input
            type='text'
            id='zipcode'
            name='zipcode'
            onChange={(e) => {
              setFormData({ ...formData, zipcode: e.target.value });
            }}
            value={formData.zipcode}
          />
          <label htmlFor='country'>Country:</label>
          <input
            type='text'
            id='country'
            name='country'
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
            }}
            value={formData.country}
          />
          <label htmlFor='phone'>Phone:</label>
          <input
            type='text'
            id='phone'
            name='phone'
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
            value={formData.phone}
          />
          <button>Create</button>
          <span className='login-create'>
            Already Have an account? <Link to='/login'> Log in</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
