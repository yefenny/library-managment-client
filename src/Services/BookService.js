import config from '../config';

const BookService = {
  getBooks() {
    return fetch(`${config.API_ENDPOINT}catalog/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          return Promise.reject(res.error);
        });
      }
      return res.json();
    });
  },
  addBooks(values) {
    return fetch(`${config.API_ENDPOINT}catalog/book/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((book) => book);
  },
  updateBook(values) {
    return fetch(`${config.API_ENDPOINT}catalog/book/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((book) => book);
  },
  deleteBook(values) {
    return fetch(`${config.API_ENDPOINT}catalog/book/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          throw res;
        });
      }
    });
  },
  borrowBook(values) {
    return fetch(
      `${config.API_ENDPOINT}account/member/checkout?book=${values.book}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((book) => book);
  },
  returnBook(values) {
    return fetch(
      `${config.API_ENDPOINT}account/member/return?book=${values.book}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((book) => book);
  },
  renewBook(values) {
    return fetch(
      `${config.API_ENDPOINT}account/member/renew?book=${values.book}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((book) => book);
  },

  getCheckoutBooks(values) {
    return fetch(
      `${config.API_ENDPOINT}account/member/checkout/books?barcode=${values.barcode}&card=${values.card}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((book) => book);
  },
  createOptions(array, name) {
    return array.map((val) => {
      return (
        <option key={val[name]} value={val[name]}>
          {val[name]}
        </option>
      );
    });
  },
  createSubjectsList(subjects) {
    let string = '';
    for (let i = 0; i <= subjects.length; i++) {
      if (i < subjects.length - 1) string += `${subjects[i].name}, `;
      else if (i === subjects.length - 1) string += `${subjects[i].name}`;
    }
    return string;
  }
};

export default BookService;
