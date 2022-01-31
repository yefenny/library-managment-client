import { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default class LibrariesList extends Component {
  render() {
    return (
      <ul>
        {this.props.libraries.map((val, i) => {
          const link = `/library/${val.name}`;
          return (
            <li key={i}>
              <Link to={link} state={{ library: val }}>
                {val.name}
              </Link>
              <button
                className='delete-button'
                onClick={() => {
                  //   setModalOpen(true);
                }}
              >
                Remove
              </button>{' '}
            </li>
          );
        })}
      </ul>
    );
  }
}
