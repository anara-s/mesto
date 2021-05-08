export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;    
    }

//Проверка запроса
    _verifyResponse(res) {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }

//Получение данных профиля
    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._verifyResponse)
    }

//Получение данных карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._verifyResponse)
    }

    getAllNeededData() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()])
    }

//Обновление данных профиля
    setProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',            
            headers: this._headers,
        body: JSON.stringify(data)
        })
        .then(this._verifyResponse)
    }

//Отправка данных новой карточки
    setNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',            
            headers: this._headers,
        body: JSON.stringify(data)
        })
        .then(this._verifyResponse)
    }

//Установка лайка
    putLike(cardID) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: "PUT",
            headers: this._headers
        })
        .then(this._verifyResponse)
    };

//Удаление лайка
    deleteLike(cardID) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._verifyResponse)
    };

//Удаление карточки
    deleteCardFromServer(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._verifyResponse)
    };

//Обновление аватара
    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',            
            headers: this._headers,
        body: JSON.stringify(data)
        })
        .then(this._verifyResponse)
    }
}