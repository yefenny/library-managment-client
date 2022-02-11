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
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState('');

  const setModalOpen = (val) => {
    setModelIsOpen(val);
  };

  const deleteSubject = () => {
    setModelIsOpen(false);

    if (subjectToDelete) {
      const toDelete = {
        barcode: AccountService.getBarcode(),
        number: AccountService.getCardNumber(),
        subject: subjectToDelete
      };
      SubjectService.deleteSubject(toDelete)
        .then((res) => {
          console.log(res);
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    SubjectService.getAllSubject().then((res) => {
      setSubjectsState({ ...subjectsState, subjects: res });
    });
  }, []);
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
          <Link to=''>{val.name}</Link>
          <button
            className='delete-button'
            onClick={() => {
              setModalOpen(true);
              setSubjectToDelete(val.name);
            }}
          >
            Remove
          </button>
          <Modal
            setModal={setModalOpen}
            text={`Are you sure you want to delete ${val.name}`}
            modalIsOpen={modalIsOpen}
            deleteFunction={deleteSubject}
          />
        </li>
      );
    });
    return (
      <div className='books-container bg-books'>
        <header>
          <h2>Subjects</h2>

          <p>Explore all subject categories.</p>
        </header>
        <div className='searchContainer'>
          <button
            className='addBook subject-list'
            onClick={() => {
              window.location = '/new/subject';
            }}
          >
            {' '}
            + Add subject
          </button>
        </div>

        <hr />
        <div className='list-item'>
          <ul>{subjects}</ul>
        </div>
      </div>
    );
  }
}
export default Subjects;
