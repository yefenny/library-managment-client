import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import AccountService from '../Services/AccountService';
import SubjectService from '../Services/SubjectService';
import SubjectForm from '../SubjectForm/SubjectForm';

function Subjects() {
  const [subjectsState, setSubjectsState] = useState({
    subjects: [],
    error: ''
  });
  const [modalOpen, setModalOpen] = useState(false);

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
      return (
        <li key={i}>
          <Link to='/update/subject'>{val.name}</Link>
          {modalOpen && <Modal setOpenModal={setModalOpen} />}
          <button
            className='delete-button'
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Remove
          </button>
        </li>
      );
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
