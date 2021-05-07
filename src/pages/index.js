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
  author,
  description,
  avatar,
  //Карточка
  popupCardSelector,
  openButtonCard,
  formElementCard,
  elementsSelector,
  popupImageSelector,
  popupSubmitSelector
} from '../utils/constants.js';

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
  }
}); 

//Класс информации о пользователе
const profileInfo = new UserInfo ({
  authorSelector: author,
  descriptionSelector: description
});

//Класс окна редактирования профиля
const popupProfile = new PopupWithForm (popupProfileSelector,
  (formData) => {
    profileInfo.setUserInfo(formData.author, formData.description);
    api.setProfileInfo({name: formData.author, about: formData.description})
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
  profileValidation.cleaningErrors();
  popupProfile.open();
});

//Класс окна редактирования аватара
const popupAvatar = new PopupWithForm (popupAvatarSelector,
  (formData) => {
    api.setAvatar({avatar: formData.avatar})
      .then(() => {
        avatar.src = formData.avatar;
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
  avatarValidation.cleaningErrors();
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
  cardValidation.cleaningErrors();
  popupCard.open();
});

//Создание нового экземпляра карточки
function createCard(text, image, likes, cardId, owner, myId, openImage, api, popupSubmit) {  
  const card = new Card(text, image, likes, cardId, owner, myId, openImage, api, popupSubmit);
  return card.generateCard();  
};

//Класс Секшн
const newCards = new Section(elementsSelector);

//Окно создания карточки
const popupCard = new PopupWithForm (popupCardSelector,
  (formData) => {
    api.setNewCard({name: formData.place, link: formData.link})
    .then((res) => {
      const cardElement = createCard(formData.place, formData.link, res.likes, res._id, res.owner, res.owner._id, handleCardClick, api, popupSubmit);
      newCards.addItem(cardElement);
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
    avatar.src = dataProfile.avatar
    newCards.renderItems({
      items: dataCards.reverse(),
      renderer: (item) => {    
        const cardElement = createCard(item.name, item.link, item.likes, item._id, item.owner, dataProfile._id, handleCardClick, api, popupSubmit);      
        newCards.addItem(cardElement);
      } 
      });
  })
  .catch((err) => {
    console.log(err); 
  }); 

