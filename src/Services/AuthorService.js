import CONFIG from '../config';
const AuthorService = {
  getAuthors() {
    return fetch(`${CONFIG.API_ENDPOINT}catalog/author`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((authors) => authors);
  },
  getFilteredMeals(query) {
    return fetch(`${CONFIG.API_ENDPOINT}meals/find/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((meals) => meals);
  },
  getMealById(id) {
    return fetch(`${CONFIG.API_ENDPOINT}meals/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((res) => {
            throw res;
          });
        }
        return res.json();
      })
      .then((meal) => meal);
  },
  createAuthor(values) {
    return fetch(`${CONFIG.API_ENDPOINT}catalog/author/add`, {
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
      .then((values) => values);
  },
  deleteAuthor(values) {
    return fetch(`${CONFIG.API_ENDPOINT}catalog/author/remove`, {
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
  updateAuthor(values) {
    return fetch(`${CONFIG.API_ENDPOINT}catalog/author/update`, {
      method: 'PUT',
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
  }
};

export default AuthorService;
