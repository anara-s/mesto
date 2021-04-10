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

//Классы форм валидации
const profileValidation = new FormValidator(enableValid, formElementProfile);
const cardValidation = new FormValidator(enableValid, formElementCard);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupsEsc); 
};

function OpenPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupsEsc);
}
  
// Редактирование профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();

  author.textContent = nameInput.value;
  description.textContent = jobInput.value;
  
  closePopup(popupProfile);
};

//Отрисовка карточки
function renderCard(card) {
  elements.prepend(card);
};

//Создание нового экземпляра карточки
function createCard(text, image, openImage) {
  const card = new Card(text, image, openImage);
  return card.generateCard();
}

//Добавление новой карточки
function addNewCard(evt) {
  evt.preventDefault();

  const cardElement = createCard(titleInput.value, imageInput.value, openImage);
  
  renderCard(cardElement); 
  closePopup(popupCard);
};

//Открытие окна с картинкой
function openImage(text, image) {
  bigImage.src = image;
  bigImage.alt = text;
  textImage.textContent = text;
  OpenPopup(popupImage);
};

//Закрытие окна при нажатии Esc
function closePopupsEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))    
  };  
};

//Включение валидации форм
profileValidation.enableValidation();
cardValidation.enableValidation();

//Слушатель открытия окна редактирования профиля
openButtonProfile.addEventListener('click', () => {
  nameInput.value = author.textContent;
  jobInput.value = description.textContent;
  profileValidation._buttonElement.classList.add('popup__button_inactive');
  profileValidation._buttonElement.setAttribute('disabled', true);
  profileValidation.cleaningErrors();
  OpenPopup(popupProfile);
});

//Слушатель открытия окна добавления карточки
openButtonCard.addEventListener('click', () => {
  formElementCard.reset();
  cardValidation._buttonElement.classList.add('popup__button_inactive');
  cardValidation._buttonElement.setAttribute('disabled', true);
  cardValidation.cleaningErrors();
  console.log(cardValidation);
  OpenPopup(popupCard);
});

// Слушатель кнопки сохранения профиля
formElementProfile.addEventListener('submit', handleProfileSubmit);

// Слушатель кнопки добавления новой карточки
formElementCard.addEventListener('submit', addNewCard);

// Закрытие окон
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      };
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      };
  });
});

// Добавление исходных карточек
initialCards.forEach(function (element) {
  const cardElement = createCard(element.name, element.link, openImage);

  renderCard(cardElement);
});



