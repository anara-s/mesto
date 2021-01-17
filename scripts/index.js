let openButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');

let formElement = popup.querySelector('.popup__container')

let nameInput = formElement.querySelector('.popup__input_content_author');
let jobInput = formElement.querySelector('.popup__input_content_description');

let author = document.querySelector('.profile__author');
let description = document.querySelector('.profile__description');

function togglePopup() {
    popup.classList.toggle('popup_opened')
}

openButton.addEventListener('click', () => {
    nameInput.value = author.textContent
    jobInput.value = description.textContent
    togglePopup ()
});

closeButton.addEventListener('click', togglePopup)

function handleFormSubmit (evt) {
    evt.preventDefault();    

    author.textContent = nameInput.value;
    description.textContent = jobInput.value;

    togglePopup()
}

formElement.addEventListener('submit', handleFormSubmit);