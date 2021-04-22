import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  //Профиль
  initialCards,
  enableValid,
  popupProfileSelector,
  openButtonProfile,
  formElementProfile,
  nameInput,
  jobInput,
  author,
  description,
  //Карточка
  popupCardSelector,
  openButtonCard,
  formElementCard,
  elementsSelector,
  popupImageSelector
} from '../utils/constants.js';

//Классы форм валидации
const profileValidation = new FormValidator(enableValid, formElementProfile);
const cardValidation = new FormValidator(enableValid, formElementCard);
  
//Включение валидации форм
profileValidation.enableValidation();
cardValidation.enableValidation();

//Класс информации о пользователе
const profileInfo = new UserInfo ({
  authorSelector: author,
  descriptionSelector: description
});

//Окно редактирования профиля
const popupProfile = new PopupWithForm (popupProfileSelector,
  (formData) => {
    profileInfo.setUserInfo(formData.author, formData.description);
});

//Слушатели окна редактирования профиля
popupProfile.setEventListeners();

//Слушатель открытия окна редактирования профиля
openButtonProfile.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.author;
  jobInput.value = userData.description;
  profileValidation.disableSubmitButton();
  profileValidation.cleaningErrors();
  popupProfile.open();
});

//Класс окна с картинкой
const popupImage = new PopupWithImage(popupImageSelector);

//Слушатели окна с картинкой
popupImage.setEventListeners();

//Открытие окна с картинкой
function handleCardClick(text, image) {
  popupImage.open(text, image)
};

//Слушатель открытия окна добавления карточки
openButtonCard.addEventListener('click', () => {
  cardValidation.disableSubmitButton();
  cardValidation.cleaningErrors();
  popupCard.open();
});

//Создание нового экземпляра карточки
function createCard(text, image, openImage) {
  const card = new Card(text, image, openImage);
  return card.generateCard();
};

//Окно создания карточки
const popupCard = new PopupWithForm (popupCardSelector,
  (formData) => {
    const cardElement = createCard(formData.place, formData.link, handleCardClick);

    newCards.addItem(cardElement);
    // popupCard.close();
});

//Слушатели окна создания карточки
popupCard.setEventListeners();

//Создание карточек
const newCards = new Section({
  items: initialCards,
  renderer: (item) => {    
    const cardElement = createCard(item.name, item.link, handleCardClick);
    newCards.addItem(cardElement);
  }
}, elementsSelector);

//Рендеринг карточек
newCards.renderItems();

