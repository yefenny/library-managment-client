import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import SubjectService from '../Services/SubjectService';

function Subjects() {
  const [subjectsState, setSubjectsState] = useState({
    subjects: [],
    error: ''
  });
  useEffect(() => {
    SubjectService.getAllSubject().then((res) => {
      setSubjectsState({ ...subjectsState, subjects: res });
    });
  });
  if (AccountService.getUserType() !== 'LIBRARIAN') {
    return (
      <div>
        <h3>You don't have access to this resource</h3>
      </div>
    );
  } else {
    const subjects = subjectsState.subjects.map((val, i) => {
      return <li key={i}>{val.name}</li>;
    });
    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Subjects</h2>
          <p>Explore all subject categories.</p>
        </header>

        <button
          className='add-button'
          onClick={() => {
            window.location = '/new/subject';
          }}
        >
          {' '}
          + Add subject
        </button>
        <hr />
        <div className='list-item'>
          <ul>{subjects}</ul>
        </div>
      </div>
    );
  }
}
export default Subjects;
