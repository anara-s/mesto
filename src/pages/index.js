import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  //Профиль
  enableValid,
  popupProfileSelector,
  openButtonProfile,
  formElementProfile,
  formElementAvatar,
  popupAvatarSelector,
  openButtonAvatar,
  nameInput,
  jobInput,
  authorSelector,
  descriptionSelector,
  avatarSelector,
  //Карточка
  templateCard,
  popupCardSelector,
  openButtonCard,
  formElementCard,
  elementsSelector,
  popupImageSelector,
  popupSubmitSelector
} from '../utils/constants.js';

let userId = ''

//Классы форм валидации
const profileValidation = new FormValidator(enableValid, formElementProfile);
const cardValidation = new FormValidator(enableValid, formElementCard);
const avatarValidation = new FormValidator(enableValid, formElementAvatar);
  
//Включение валидации форм
profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

//Класс апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '16d86417-eb7f-4918-873a-8dac3ede168f',
    'Content-Type': 'application/json'
  }
}); 

//Класс информации о пользователе
const profileInfo = new UserInfo ({
  authorSelector: authorSelector,
  descriptionSelector: descriptionSelector,
  avatarSelector: avatarSelector
});

//Класс окна редактирования профиля
const popupProfile = new PopupWithForm (popupProfileSelector,
  (formData) => {
    api.setProfileInfo({name: formData.author, about: formData.description})
      .then(() => {
        profileInfo.setUserInfo(formData.author, formData.description);
        popupProfile.close()
      })
      .catch((err) => {
          console.log(err); 
        })
      .finally(() => {
        popupProfile.renderLoading(false, 'Сохранить');
      });
});

//Слушатели окна редактирования профиля
popupProfile.setEventListeners();

//Слушатель открытия окна редактирования профиля
openButtonProfile.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.author;
  jobInput.value = userData.description;
  profileValidation.disableSubmitButton();
  profileValidation.cleanErrors();
  popupProfile.open();
});

//Класс окна редактирования аватара
const popupAvatar = new PopupWithForm (popupAvatarSelector,
  (formData) => {
    api.setAvatar({avatar: formData.avatar})
      .then(() => {
        profileInfo.setAvatarInfo(formData.avatar)
        popupAvatar.close();
      })
      .catch((err) => {
          console.log(err); 
        })
      .finally(() => {
        popupAvatar.renderLoading(false, 'Сохранить');
      });   
});

//Слушатели окна редактирования аватара
popupAvatar.setEventListeners();

//Слушатель открытия окна редактирования аватара
openButtonAvatar.addEventListener('click', () => {
  avatarValidation.disableSubmitButton();
  avatarValidation.cleanErrors();
  popupAvatar.open()
});

//Класс окна с картинкой
const popupImage = new PopupWithImage(popupImageSelector);

//Слушатели окна с картинкой
popupImage.setEventListeners();

//Открытие окна с картинкой
function handleCardClick(text, image) {
  popupImage.open(text, image)
};

//Класс окна с подтверждением
const popupSubmit = new PopupWithSubmit(popupSubmitSelector);

//Слушатели окна с подтверждением
popupSubmit.setEventListeners();


//Слушатель открытия окна добавления карточки
openButtonCard.addEventListener('click', () => {
  cardValidation.disableSubmitButton();
  cardValidation.cleanErrors();
  popupCard.open();
});

//Создание нового экземпляра карточки
function createCard(templateCard, text, image, element, userId, openImage, api, popupSubmit) {  
  const card = new Card(templateCard, text, image, element, userId, openImage, api, popupSubmit);
  return card.generateCard();  
};


//Окно создания карточки
const popupCard = new PopupWithForm (popupCardSelector,
  (formData) => {
    api.setNewCard({name: formData.place, link: formData.link})
    .then((res) => {
      const cardElement = createCard(templateCard, formData.place, formData.link, res, userId, handleCardClick, api, popupSubmit);
      document.querySelector(elementsSelector).prepend(cardElement);
      popupCard.close()
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      popupCard.renderLoading(false, 'Создать');
    });   
    
});

//Слушатели окна создания карточки
popupCard.setEventListeners();

// Получение исходных данных для отрисовки
api.getAllNeededData()
  .then(argument => {
    const [dataProfile, dataCards] = argument
    profileInfo.setUserInfo(dataProfile.name, dataProfile.about)
    profileInfo.setAvatarInfo(dataProfile.avatar)
    userId = dataProfile._id
    const newCards = new Section({
    items: dataCards.reverse(),
    renderer: (item) => {    
      const cardElement = createCard(templateCard, item.name, item.link, item, userId, handleCardClick, api, popupSubmit);
      newCards.addItem(cardElement);
    }
  }, elementsSelector)
  newCards.renderItems();
  })
  .catch((err) => {
    console.log(err); 
  }); 

  