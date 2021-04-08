import { Card } from './Card.js' 
import { FormValidator } from './FormValidator.js' 


// Исходные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const enableValid = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',    
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'error_active'
};

const popups = document.querySelectorAll('.popup')

//Профиль
const popupProfile = document.querySelector('.popup_type_profile');
const openButtonProfile = document.querySelector('.profile__edit');

const formElementProfile = popupProfile.querySelector('.popup__container_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_content_author');
const jobInput = formElementProfile.querySelector('.popup__input_content_description');

const author = document.querySelector('.profile__author');
const description = document.querySelector('.profile__description');

//Карточка
const popupCard = document.querySelector('.popup_type_card');
const openButtonCard = document.querySelector('.profile__add');

const formElementCard = popupCard.querySelector('.popup__container_type_card');
const titleInput = formElementCard.querySelector('.popup__input_content_place');
const imageInput = formElementCard.querySelector('.popup__input_content_limk');

const elements = document.querySelector(".elements");

//Окно с картинкой
const popupImage = document.querySelector('.popup_type_image');
const bigImage = popupImage.querySelector('.popup__image');
const textImage = popupImage.querySelector('.popup__text');


// Переключение класса модального окна
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closePopupsEsc);
  } else {
    document.removeEventListener('keydown', closePopupsEsc); 
  };
};
  
// Редактирование профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();

  author.textContent = nameInput.value;
  description.textContent = jobInput.value;

  togglePopup (popupProfile);
};


//Отрисовка карточки
function renderCard(card) {
  elements.prepend(card);
};

//Добавление новой карточки
function addNewCard (evt) {
  evt.preventDefault();

  const card = new Card(titleInput.value, imageInput.value, openImage);
  const cardElement = card.generateCard();

  renderCard(cardElement); 
  togglePopup(popupCard);
};

//Открытие окна с картинкой
function openImage (evt) {
  const target = evt.target;
  const currentImage = target.closest('.elements__image').src;
  const currentCard = target.closest('.elements__card');
  const currentPlace = currentCard.querySelector('.elements__title').textContent;
    
  bigImage.src = currentImage;
  bigImage.alt = currentPlace;
  textImage.textContent = currentPlace;

  togglePopup (popupImage);  
};

//Закрытие окна при нажатии Esc
function closePopupsEsc (evt) {
  if (evt.key === 'Escape') {
    togglePopup(document.querySelector('.popup_opened'))    
  };  
};

//Очистка ошибок в формах
function cleaningErrors (form) {
  const errorInput = form.querySelectorAll('.popup__input_error');
  const errorActive = form.querySelectorAll('.error_active');
  errorInput.forEach((element) => element.classList.remove('popup__input_error'));
  errorActive.forEach((element) => element.classList.remove('error_active'));
};

//Слушатель открытия окна редактирования профиля
openButtonProfile.addEventListener('click', () => {
  nameInput.value = author.textContent;
  jobInput.value = description.textContent;
  cleaningErrors(formElementProfile);
  togglePopup(popupProfile);  
});

//Слушатель открытия окна добавления карточки
openButtonCard.addEventListener('click', () => {
  formElementCard.reset();
  cleaningErrors(formElementCard);
  togglePopup(popupCard);  
});

// Слушатель кнопки сохранения профиля
formElementProfile.addEventListener('submit', handleProfileSubmit);

// Слушатель кнопки добавления новой карточки
formElementCard.addEventListener('submit', addNewCard);

// Закрытие окон
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        togglePopup(popup);
      };
      if (evt.target.classList.contains('popup__close')) {
        togglePopup(popup);
      };
  });
});

// Добавление исходных карточек
initialCards.forEach(function (element) {
  const card = new Card(element.name, element.link, openImage);
  const cardElement = card.generateCard();

  renderCard(cardElement);
});


//Классы форм валидации
const profileValidation = new FormValidator(enableValid, formElementProfile);
const cardValidation = new FormValidator(enableValid, formElementCard);

//Включение валидации форм
profileValidation.enableValidation();
cardValidation.enableValidation();
