export default class FormValidator {
	constructor(object, form) {
		this._form = form;
		this._inputSelector = object.inputSelector;
		this._submitButtonSelector = object.submitButtonSelector;
		this._inactiveButtonClass = object.inactiveButtonClass;
		this._inputErrorClass = object.inputErrorClass;
		this._errorClass = object.errorClass;
		this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  		this._buttonElement = this._form.querySelector(this._submitButtonSelector);
	};

	// Проверка на пустые поля
	_allInputsEmpty = () => {
		return !this._inputList.some(inputElement => inputElement.value.length > 0);
    };

	// Проверка наличия не валидного поля
	_hasInvalidInput = () => {
		return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

	disableSubmitButton = () => {
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.setAttribute('disabled', true);
	};

	// Переключение кнопки	
	_toggleButtonState = () => {	
		if (this._hasInvalidInput() || this._allInputsEmpty()) {
			this.disableSubmitButton();
		} else {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.removeAttribute('disabled');
		}
    };

	// Показ ошибки
	_showInputError = (inputElement) => {
		const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(this._errorClass);
  	};

	// Скрытие ошибки
    _hideInputError = (inputElement) => {
		const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
  	};

	// Очистка ошибок в формах
	cleaningErrors() {			
		this._inputList.forEach(input => this._hideInputError(input));		
	};

	// Проверка валидности
	_checkInput = (inputElement) => {
		if (inputElement.validity.valid) {
			this._hideInputError(inputElement);
		} else {
			this._showInputError(inputElement);
		}
  	};

	// Слушатели
	_setInputListeners = () => {		
		this._inputList.forEach(
		inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInput(inputElement);
				this._toggleButtonState();
			});
			
			this._toggleButtonState();
		});
  	};

	// Включение валидации форм
	enableValidation = () => {
		this._form.addEventListener('submit', (event) => {
				event.preventDefault();
				});
				this._setInputListeners();
		
	};

};