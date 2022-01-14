import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import MemberService from '../Services/MemberService';
function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    country: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
    error: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      streetAddress,
      city,
      zipcode,
      country,
      email,
      phoneNumber,
      password,
      repeatPassword
    } = formData;
    const required = {
      name,
      email,
      password,
      repeatPassword,
      streetAddress,
      city,
      zipcode,
      country,
      phoneNumber
    };
    for (const [key, value] of Object.entries(required)) {
      if (value.trim().length < 1) {
        setFormData({ ...formData, error: `${key} is required` });
        return;
      }
    }
    if (password !== repeatPassword) {
      setFormData({
        ...formData,
        error: 'password and repeatPassword should be the same'
      });
      return;
    }
    const newUser = {
      name,
      password,
      email,
      streetAddress,
      city,
      zipcode,
      country,
      phoneNumber
    };
    console.log(newUser);
    MemberService.createMember(newUser)
      .then((res) => {
        console.log('hereee');
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <div className='sign-up-container '>
      <div className='bg-library'>Image by rawpixel.com</div>
      <div className='sign-up-form'>
        <h1>Create Account</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='error'>{formData.error}</div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            name='email'
            required
            onChange={handleChange}
            value={formData.email}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            name='password'
            required
            onChange={handleChange}
            value={formData.password}
          />
          <label htmlFor='repeatPassword'>Repeat password:</label>
          <input
            type='text'
            id='repeatPassword'
            name='repeatPassword'
            required
            onChange={handleChange}
            value={formData.repeatPassword}
          />
          <label htmlFor='streetAddress'>Street address:</label>
          <input
            type='text'
            id='streetAddress'
            name='streetAddress'
            required
            onChange={handleChange}
            value={formData.streetAddress}
          />
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            id='city'
            name='city'
            required
            onChange={handleChange}
            value={formData.city}
          />

          <label htmlFor='zipcode'>ZIP Code:</label>
          <input
            type='text'
            id='zipcode'
            name='zipcode'
            required
            onChange={handleChange}
            value={formData.zipcode}
          />
          <label htmlFor='country'>Country:</label>
          <input
            type='text'
            id='country'
            name='country'
            required
            onChange={handleChange}
            value={formData.country}
          />
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            required
            onChange={handleChange}
            value={formData.phoneNumber}
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
