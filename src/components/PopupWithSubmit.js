import Popup from './Popup.js' 

export default class PopupWithSubmit extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
      
    };

  //Подтверждение формы
    setFormSubmit(submitAction) {
        this._handleSubmitCallback = submitAction;
    }
  
  //Установка слушателей
    setEventListeners () {
        this._form.addEventListener('submit', evt => {
              evt.preventDefault();
              this._handleSubmitCallback();
              this.close();
            }
          )
    
        super.setEventListeners()
      } 
};