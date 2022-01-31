import React from 'react';

function Modal({ setModal, modalIsOpen, text, deleteLibrary }) {
  const hideDiv = () => {
    if (!modalIsOpen) return { display: 'none' };
    else return { display: 'flex' };
  };
  return (
    <div className='modalBackground' style={hideDiv()}>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className='title'>
          <h1>Are You Sure You Want to delete the library?</h1>
        </div>
        {/* <div className='body'>
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div> */}
        <div className='footer'>
          <button
            onClick={() => {
              setModal(false);
            }}
            id='cancelBtn'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteLibrary();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
