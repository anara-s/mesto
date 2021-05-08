export default class UserInfo {
    constructor ({authorSelector, descriptionSelector, avatarSelector}) {
        this._authorSelector = authorSelector;
        this._descriptionSelector = descriptionSelector;
        this._avatarSelector = avatarSelector;
        this._author = document.querySelector(this._authorSelector);
        this._description = document.querySelector(this._descriptionSelector);
        this._avatar = document.querySelector(this._avatarSelector)
    };

    //Получение данных профиля
    getUserInfo() {
        this._userInfo = {
            author: this._author.textContent,
            description:  this._description.textContent
        }

        return this._userInfo;
    
    };

    //Установка данных профиля
    setUserInfo(name, info) {
        this._author.textContent = name;
        this._description.textContent = info;
    };

    //Установка данных аватара
    setAvatarInfo(avatar) {
        this._avatar.src = avatar;
    };
}

