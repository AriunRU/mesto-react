class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
  }

  getUsersApi() {
    return this._request("/users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      method: 'GET',
      headers: this._headers,
    });
  }

  infoNewUser(name, about) {
    return this._request("/users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  avatarNewUser(dataAvatar) {
    return this._request("/users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataAvatar,
      })
    });
  }

  addNewCard(name, link) {
    return this._request("/cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    });
  }

  removeCard(id) {
    return this._request(`/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  likeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLike(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.likeCard(id) : this.deleteLike(id);
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '2e4da387-210d-4156-b421-ffadc6c7daf6',
    'Content-Type': 'application/json'
  }
});

export default api;
