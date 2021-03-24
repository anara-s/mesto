
// Проверка на пустые поля
const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
};

// Проверка наличия не валидного поля
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

// Переключение кнопки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
      buttonElement.classList.add('popup__button_inactive');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('popup__button_inactive');
      buttonElement.removeAttribute('disabled');
    }
  };

// Показ ошибки
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('error_active');
  };

// Скрытие ошибки
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('error_active');
  };

// Проверка валидности
const checkInput = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement);
    } else {
      showInputError(formElement, inputElement);
    }
  };

// Слушатели
const setInputListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll('.popup__input')
    );
    const buttonElement = formElement.querySelector('.popup__button');
    
    inputList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          checkInput(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
        
        toggleButtonState(inputList, buttonElement);
      }
    );
  };

// Включение валидации форм
const enableValidation = () => {
    const formList = Array.from(
      document.querySelectorAll('.popup__container')
    );
    
    formList.forEach(
      formElement => {
        formElement.addEventListener('submit', (event) => {
          event.preventDefault();
        });
        setInputListeners(formElement);
      }
    );
  };
  
  enableValidation();