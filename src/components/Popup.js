export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
    };
//Открытие окна
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    };

//Закрытие окна
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this)); 
    };

//Закрытие по кнопке
    _handleEscClose(evt) {       
        if (evt.key === 'Escape') {
        this.close(document.querySelector('.popup_opened'))    
        }
        
    };

//Установка слушателей
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                this.close();
              }
        });
    };


}