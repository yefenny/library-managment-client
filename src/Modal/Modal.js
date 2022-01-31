import React from 'react';

function Modal({ setModal, modalIsOpen, text, deleteFunction }) {
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
          <h1>{text}</h1>
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
              deleteFunction();
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
