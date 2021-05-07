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
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', {
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f'
            }
        })
        .then(this._verifyResponse)
    }

//Получение данных карточек
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', {
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f'
            }
        })
        .then(this._verifyResponse)
    }

    getAllNeededData() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()])
    }

//Обновление данных профиля
    setProfileInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', {
            method: 'PATCH',            
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
        })
        .then(this._verifyResponse)
    }

//Отправка данных новой карточки
    setNewCard(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards ', {
            method: 'POST',            
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
        })
        .then(this._verifyResponse)
    }

//Установка лайка
    putLike(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardID}`, {
            method: "PUT",
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
                'Content-Type': 'application/json'
            }
        })
        .then(this._verifyResponse)
    };

//Удаление лайка
    deleteLike(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardID}`, {
            method: "DELETE",
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
                'Content-Type': 'application/json'
            }
        })
        .then(this._verifyResponse)
    };

//Удаление карточки
    deleteCardFromServer(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/${cardID}`, {
            method: "DELETE",
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
                'Content-Type': 'application/json'
            }
        })
        .then(this._verifyResponse)
    };

//Обновление аватара
    setAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar', {
            method: 'PATCH',            
            headers: {
                authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
        })
        .then(this._verifyResponse)
    }
}