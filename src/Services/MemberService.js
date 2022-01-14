import config from '../config';
const MemberService = {
  createMember(member) {
    return fetch(`${config.API_ENDPOINT}account/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          return Promise.reject(res.error);
        });
      }
      return res.json();
    });
  },
  logIn(user) {
    return fetch(`${config.API_ENDPOINT}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((res) =>
      !res.ok ? res.json().then((res) => Promise.reject(res.error)) : res.json()
    );
  },
  getFullName() {
    return fetch(`${config.API_ENDPOINT}users/`, {
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
      .then((res) => res);
  }
};
export default MemberService;
