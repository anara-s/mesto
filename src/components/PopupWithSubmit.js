import Popup from './Popup.js' 

export default class PopupWithSubmit extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._button = this._form.querySelector('.popup__button');
      
    };

    //Показ процесса загрузки данных
    renderLoading(isLoading, content) {
      if (isLoading) {
        this._button.textContent = content;
      }
      else {
        this._button.textContent = content;
      }
    } 
 
    //Подтверждение формы
    setFormSubmit(submitAction) {
        this._handleSubmitCallback = submitAction;
    }
  
  //Установка слушателей
    setEventListeners () {
        this._form.addEventListener('submit', evt => {
              evt.preventDefault();
              this.renderLoading(true, 'Удаление...');
              this._handleSubmitCallback();
            }
          )
    
        super.setEventListeners()
      } 
};