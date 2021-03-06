import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import SubjectService from '../Services/SubjectService';

function SubjectForm() {
  const [subjectForm, setSubjectForm] = useState({
    subject: '',
    error: ''
  });
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state) setSubjectForm({ error: '', subject: state.subject.name });
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubjectForm({ ...subjectForm, error: '' });
    if (subjectForm.subject.trim().length < 1) {
      setSubjectForm({ ...subjectForm, error: 'Subject is required' });
      return;
    }
    SubjectService.createSubject({
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      subject: subjectForm.subject
    })
      .then((res) => {
        console.log(res);
        window.location = '/subjects';
      })
      .catch((error) => {
        setSubjectForm({ ...subjectForm, error: 'Subject already exist' });
      });
  };
  if (AccountService.getUserType() === 'LIBRARIAN') {
    return (
      <div className='form-background'>
        <div className='add-form'>
          <h2>{state ? 'Update Subject' : 'New Subject'}</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className='error'>{subjectForm.error}</div>
            <label htmlFor='subject'>Subject:</label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={subjectForm.subject}
              placeholder='E.g action and adventure, classics, fantasy, horror ...'
              onChange={(e) => {
                setSubjectForm({ ...subjectForm, subject: e.target.value });
              }}
            ></input>
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3> You don't have access to this resource</h3>
      </div>
    );
  }
}
export default SubjectForm;
