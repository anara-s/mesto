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

export const formElementAvatar = document.querySelector('.popup__container_type_avatar');
export const popupAvatarSelector = '.popup_type_avatar';
export const openButtonAvatar = document.querySelector('.profile__edit-avatar');

export const authorSelector = '.profile__author';
export const descriptionSelector = '.profile__description';
export const avatarSelector = '.profile__image';

//Карточка
export const templateCard = document.querySelector('.elements__template');
export const popupCardSelector = '.popup_type_card';
export const openButtonCard = document.querySelector('.profile__add');

export const formElementCard = document.querySelector('.popup__container_type_card');

export const elementsSelector = '.elements';

export const popupImageSelector = '.popup_type_image';

export const popupSubmitSelector = '.popup_type_submit';