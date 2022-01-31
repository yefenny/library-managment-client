import { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
import AccountService from '../Services/AccountService';

export default function Author() {
  const [author, setAuthor] = useState({});
  const state = useLocation().state;
  useEffect(() => {
    setAuthor(state.author);
  }, [author]);

  if (AccountService.getUserType !== 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='view-item'>
          <h2>{author.name}</h2>
          <p>{author.description}</p>
          <button className='blue-button' onClick={()=> {
              window.location = '/authors'
          }}>Go back</button>
        </div>
      </div>
    );
  } else {
    return <p>You don't have access to this resource</p>;
  }
}
