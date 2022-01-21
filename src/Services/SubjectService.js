import CONFIG from '../config';
const SubjectService = {
  getAllSubject() {
    return fetch(`${CONFIG.API_ENDPOINT}catalog/subjects`, {
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
      .then((subjects) => subjects);
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
  createSubject(values) {
    return fetch(`${CONFIG.API_ENDPOINT}catalog/subject/add`, {
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
      .then((subject) => subject);
  },
  deleteMeal(id) {
    return fetch(`${CONFIG.API_ENDPOINT}meals/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          throw res;
        });
      }
    });
  },
  updateMeal(id, values) {
    return fetch(`${CONFIG.API_ENDPOINT}meals/${id}`, {
      method: 'PATCH',
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

export default SubjectService;
