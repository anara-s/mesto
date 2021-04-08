export class FormValidator {
	constructor(object, form) {
		this._form = form;
		this._inputSelector = object.inputSelector;
		this._submitButtonSelector = object.submitButtonSelector;
		this._inactiveButtonClass = object.inactiveButtonClass;
		this._inputErrorClass = object.inputErrorClass;
		this._errorClass = object.errorClass
	}

	// Проверка на пустые поля
	_allInputsEmpty = (inputList) => {
		return !inputList.some(inputElement => inputElement.value.length > 0);
    };

	// Проверка наличия не валидного поля
    _hasInvalidInput = (inputList) => {
		return inputList.some(inputElement => !inputElement.validity.valid);
    };

	// Переключение кнопки
	_toggleButtonState = (inputList, buttonElement) => {
		if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
			buttonElement.classList.add(this._inactiveButtonClass);
			buttonElement.setAttribute('disabled', true);
		} else {
			buttonElement.classList.remove(this._inactiveButtonClass);
			buttonElement.removeAttribute('disabled');
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
		const inputList = Array.from(
		this._form.querySelectorAll(this._inputSelector)
		);
		const buttonElement = this._form.querySelector(this._submitButtonSelector);
		
		inputList.forEach(
		inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInput(inputElement);
				this._toggleButtonState(inputList, buttonElement);
			});
			
			this._toggleButtonState(inputList, buttonElement);
		});
  	};

	// Включение валидации форм
	enableValidation = () => {
		this._form.addEventListener('submit', (event) => {
				event.preventDefault();
				});
				this._setInputListeners();
		
	};
	  
}