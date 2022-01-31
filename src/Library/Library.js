import { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
import AccountService from '../Services/AccountService';

export default function Library() {
  const [library, setLibrary] = useState({});
  const state = useLocation().state;
  useEffect(() => {
    setLibrary(state.library);
  }, [library]);

  if (AccountService.getUserType !== 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='view-item'>
          <h2>{library.name}</h2>
          <p>{library.streetAddress}</p>
          <p>{library.city}</p>
          <p>{library.zipcode}</p>
          <p>{library.country}</p>
          <button className='blue-button' onClick={()=> {
              window.location = '/libraries'
          }}>Go back</button>
        </div>
      </div>
    );
  } else {
    return <p>You don't have access to this resource</p>;
  }
}
