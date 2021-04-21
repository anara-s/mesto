export default class UserInfo {
    constructor ({authorSelector, descriptionSelector}) {
        this._authorSelector = authorSelector;
        this._descriptionSelector = descriptionSelector;
        
    };

    getUserInfo() {
        this._userInfo = {
            author: document.querySelector(this._authorSelector).textContent,
            description: document.querySelector(this._descriptionSelector).textContent
        }

        return this._userInfo;
    
    };

    setUserInfo(name, info) {
        document.querySelector(this._authorSelector).textContent = name;
        document.querySelector(this._descriptionSelector).textContent = info;
    };
}

