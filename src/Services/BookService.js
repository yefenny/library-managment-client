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
  createOptions(array, name){
    return array.map(val => {
     return <option key={val[name]} value={val[name]}>
        {val[name]}
      </option>
    })
  }
};

export default BookService;
