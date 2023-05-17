class Api {
  constructor({ url, urlAuthentication, headers }) {
    this._url = url;
    this._headers = headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  };

  patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._checkResponse(res))
  };

  patchUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._checkResponse(res))
  };

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  };

  postNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._checkResponse(res))
  };

  putCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  };

  delCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  };

  delCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  };

  userRegistration(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((res) => this._checkResponse(res))
  };

  userAuthenticate(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((res) => this._checkResponse(res))
  };

  checkJwt() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${jvt}`
      // },
     headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  };

}

const configApi = {
  url: 'http://localhost:3005',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
};

const api = new Api(configApi);

export default api;

