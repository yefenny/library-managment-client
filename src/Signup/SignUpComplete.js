import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';

function SignUpComplete() {
  return (
    <div className='sign-up-complete-bg'>
      <div className='sign-up-complete'>
        <h2>Welcome!</h2>
        <span>
          This is your library card number: {AccountService.getCardNumber()}
        </span>
        <span>Store it in a safe place.</span>
        <Link to='/books'>Go to books</Link>
      </div>
    </div>
  );
}

export default SignUpComplete;
