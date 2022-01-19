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
  }
};

export default BookService;
