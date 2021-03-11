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

//Профиль
const popupProfile = document.querySelector('.popup_type_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const openButtonProfile = document.querySelector('.profile__edit');

const formElementProfile = popupProfile.querySelector('.popup__container_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_content_author');
const jobInput = formElementProfile.querySelector('.popup__input_content_description');

const author = document.querySelector('.profile__author');
const description = document.querySelector('.profile__description');

//Карточка
const popupCard = document.querySelector('.popup_type_card');
const closeButtonCard = popupCard.querySelector('.popup__close');
const openButtonCard = document.querySelector('.profile__add');

const formElementCard = popupCard.querySelector('.popup__container_type_card');
const titleInput = formElementCard.querySelector('.popup__input_content_place');
const imageInput = formElementCard.querySelector('.popup__input_content_limk');

const elements = document.querySelector(".elements");
const cardTemplate = elements.querySelector(".elements__template").content;

//Окно с картинкой
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const bigImage = popupImage.querySelector('.popup__image');
const textImage = popupImage.querySelector('.popup__text');

// Переключение класса модального окна
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

//Слушатель открытия окна редактирования профиля
openButtonProfile.addEventListener('click', () => {
    nameInput.value = author.textContent;
    jobInput.value = description.textContent;
    togglePopup(popupProfile);
});

//Слушатель закрытия окна редактирования профиля
closeButtonProfile.addEventListener('click', () => {
  togglePopup(popupProfile);
});

//Слушатель открытия окна добавления карточки
openButtonCard.addEventListener('click', () => {
  titleInput.value = "";
  imageInput.value = "";
  togglePopup(popupCard);
});

//Слушатель закрытия окна добавления карточки
closeButtonCard.addEventListener('click', () => {
  togglePopup(popupCard);
});

//Слушатель закрытия окна с картинкой
closeButtonImage.addEventListener('click', () => {
  togglePopup(popupImage);
});

// Слушатель кнопки сохранения профиля
formElementProfile.addEventListener('submit', handleProfileSubmit);

// Слушатель кнопки добавления новой карточки
formElementCard.addEventListener('submit', addNewCard);

// Редактирование профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();

  author.textContent = nameInput.value;
  description.textContent = jobInput.value;

  togglePopup (popupProfile);
};

//Функция слушателей удаления, лайка и картинки
function listenButtons(card) {
  card.querySelector(".elements__trash").addEventListener('click', deleteCard);
  card.querySelector(".elements__like").addEventListener('click', likeCard);
  card.querySelector(".elements__image").addEventListener('click', openImage);
};

//Создание карточки
function createCard(title, image) {
  const htmlElement = cardTemplate.cloneNode(true);

  htmlElement.querySelector(".elements__title").textContent = title;
  htmlElement.querySelector(".elements__image").src = image;
  htmlElement.querySelector(".elements__image").alt = title;

  listenButtons(htmlElement);

  return htmlElement;
};

//Отрисовка карточки
function renderCard(card) {
  elements.prepend(card);
};

//Добавление новой карточки
function addNewCard (evt) {
  evt.preventDefault();

  const cardTitle = titleInput.value;
  const cardImage = imageInput.value;
  const card = createCard(cardTitle, cardImage);

  renderCard(card);

  togglePopup(popupCard);
};

// Добавление исходных карточек
initialCards.forEach(function (element) {
  
  const cardTitle = element.name;
  const cardImage = element.link;
  const card = createCard(cardTitle, cardImage);

  renderCard(card);

  togglePopup(popupCard);
});

//Удаление карточек
function deleteCard (evt) {
  const target = evt.target;
  const currentCard = target.closest('.elements__card');

  currentCard.remove();
};

//Лайк карточек
function likeCard (evt) {
  const target = evt.target;
  const currentLike = target.closest('.elements__like');

  currentLike.style.backgroundImage = 'url(images/like_active.svg)';
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
