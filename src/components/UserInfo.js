export default class UserInfo {
    constructor ({authorSelector, descriptionSelector}) {
        this._authorSelector = authorSelector;
        this._descriptionSelector = descriptionSelector;
    };

    //Получение данных профиля
    getUserInfo() {
        this._userInfo = {
            author: document.querySelector(this._authorSelector).textContent,
            description: document.querySelector(this._descriptionSelector).textContent
        }

        return this._userInfo;
    
    };

    //Установка данных профиля
    setUserInfo(name, info) {
        document.querySelector(this._authorSelector).textContent = name;
        document.querySelector(this._descriptionSelector).textContent = info;
        
    };
}

