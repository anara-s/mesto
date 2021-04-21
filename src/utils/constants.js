// Исходные карточки
export const initialCards = [
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

export const enableValid = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',    
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_active'
};

  //Профиль
export const popupProfileSelector = '.popup_type_profile';
export const openButtonProfile = document.querySelector('.profile__edit');

export const formElementProfile = document.querySelector('.popup__container_type_profile');
export const nameInput = formElementProfile.querySelector('.popup__input_content_author');
export const jobInput = formElementProfile.querySelector('.popup__input_content_description');

export const author = '.profile__author';
export const description = '.profile__description';

//Карточка
export const popupCardSelector = '.popup_type_card';
export const openButtonCard = document.querySelector('.profile__add');

export const formElementCard = document.querySelector('.popup__container_type_card');

export const elementsSelector = '.elements';

export const popupImageSelector = '.popup_type_image';