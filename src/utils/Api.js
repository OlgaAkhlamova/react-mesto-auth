class Api {
  constructor ({url, headers}) {
    this._url = url;
    this._headers = headers;
    this.postCard = this.postCard.bind(this);
    this.deleteCardApi = this.deleteCardApi.bind(this);
    this.changeProfileInfo =  this.changeProfileInfo.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.addLike = this.addLike.bind(this);
    this.deleteLike = this.deleteLike.bind(this); 
  }

  // Проверка ответа сервера после запроса
  _checkReply(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  };

  // Получение списка всех карточек в виде массива 
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkReply)
  }

  // Добавление карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
    })
    .then(this._checkReply)
  }
  // Удаление карточки 
  deleteCardApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(this._checkReply)
  }

 // Загрузка информации о пользователе с сервера
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkReply)
  } 

  // Замена данных пользователя 
  changeProfileInfo(data) {
    console.log(data);
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.username,
          about: data.userjob
        }) 
    })
    .then(this._checkReply)
  }

  // Замена аватара 
  changeAvatar(data) {
    console.log(data);
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar}) 
    })
    .then(this._checkReply)
  }

  // Добавление лайка карточке
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
    //    body: JSON.stringify(data)
    })
    .then(this._checkReply)
  }
  // Удаление лайка карточки 
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(this._checkReply)
  }
  // Смена активности лайка
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId)
    }
  }

  // Общий промис для отрисовки страницы
  getPromiseAll() {
    return Promise.all([
      this.getCards(),
      this.getInfoUser()
    ])
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization:  'd354f96e-d497-4a80-83a9-7ae4ace966c3',
    'content-type': 'application/json'
  }
});
