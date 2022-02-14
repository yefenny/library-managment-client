import React from 'react';

function AlertModal({ setModal, modalIsOpen, text }) {
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
          <h1>Are you sure you want to delete it ?</h1>
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
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
