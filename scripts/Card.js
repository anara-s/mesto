
export class Card {
	constructor(text, image, openImage) {
		this._text = text;
		this._image = image;
		this._openImage = openImage;
	}

    _getTemplate() {
        const cardElement = document
          .querySelector('.elements__template')
          .content          
          .cloneNode(true);
    
        return cardElement;
    }

    _deleteCard (evt) {
        evt.target.closest('.elements__card').remove();
    };

    _likeCard (evt) {
        evt.target.closest('.elements__like').classList.toggle('elements__like_active');
    };
    
    _setEventListeners() {
        this._element.querySelector(".elements__trash").addEventListener('click', this._deleteCard);
        this._element.querySelector(".elements__like").addEventListener('click', this._likeCard);
        this._element.querySelector(".elements__image").addEventListener('click', this._openImage);
    };

    generateCard() {
        this._element = this._getTemplate();        
        this._element.querySelector('.elements__title').textContent = this._text;
        this._element.querySelector('.elements__image').src = this._image;
        this._element.querySelector('.elements__image').alt = this._text;

    
        this._setEventListeners();
    
        return this._element;
    }


}