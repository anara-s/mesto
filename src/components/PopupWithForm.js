import Popup from './Popup.js' 

export default class PopupWithForm extends Popup {
    constructor (popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup__container');
      this._button = this._form.querySelector('.popup__button');
      this._inputList = this._form.querySelectorAll('.popup__input');
    }

//Показ процесса загрузки данных
    renderLoading(isLoading, content) {
      if (isLoading) {
        this._button.textContent = content;
      }
      else {
        this._button.textContent = content;
      }
    }
  
//Получение значений полей формы    
    _getInputValues() {      
      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);
      
      return this._formValues;
    }

//Установка слушателей
    setEventListeners () {
      this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.renderLoading(true, 'Сохранение...');
            this._handleFormSubmit(this._getInputValues());
          }
        )
  
      super.setEventListeners()
    }

//Сброс формы при закрытии окна
    close() {
      this._form.reset();

      super.close();
    }
  }