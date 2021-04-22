export default class Card {
	constructor(text, image, handleCardClick) {
		this._text = text;
		this._image = image;
		this._handleCardClick = handleCardClick;
	};

    //Получение Template
    _getTemplate() {
        const cardElement = document
          .querySelector('.elements__template')
          .content          
          .cloneNode(true);
    
        return cardElement;
    };

    //Удаление карточек
    _deleteCard (evt) {
        evt.target.closest('.elements__card').remove();
    };

    //Лайк карточек
    _likeCard (evt) {
        evt.target.classList.toggle('elements__like_active');
    };
    
    //Функция слушателей удаления, лайка и картинки
    _setEventListeners() {
        this._element.querySelector(".elements__trash").addEventListener('click', this._deleteCard);
        this._element.querySelector(".elements__like").addEventListener('click', this._likeCard);
        this._element.querySelector(".elements__image").addEventListener('click', () => this._handleCardClick(this._text, this._image));
    };

    //Генерация карточки
    generateCard() {
        this._element = this._getTemplate();
        this._picture = this._element.querySelector('.elements__image');
        this._title = this._element.querySelector('.elements__title');

        this._title.textContent = this._text;
        this._picture.src = this._image;
        this._picture.alt = this._text;
    
        this._setEventListeners();
    
        return this._element;
    };


};