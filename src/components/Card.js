export default class Card {
	constructor(text, image, likes, cardId, owner, myId, handleCardClick, api, popupSubmit) {
		this._text = text;
		this._image = image;
        this._likes = likes;
        this._cardId = cardId;
        this._owner = owner;
        this._myId = myId;
		this._handleCardClick = handleCardClick;
        this._api = api;
        this._popupSubmit = popupSubmit;
        this._element = this._getTemplate();
        this._picture = this._element.querySelector('.elements__image');
        this._title = this._element.querySelector('.elements__title');
        this._likeCount = this._element.querySelector('.elements__count');   
        this._like = this._element.querySelector(".elements__like");
        this._trash = this._element.querySelector(".elements__trash")
	};

    //Получение Template
    _getTemplate() {
        const cardElement = document
          .querySelector('.elements__template')
          .content          
          .cloneNode(true);
    
        return cardElement;
    };

    //Лайк карточек
    _likeCard (evt) {
        if (evt.target.classList.contains('elements__like_active')) {
            this._api.deleteLike(this._cardId)
            .then((res) => {
                this._likeCount.textContent = res.likes.length;   
            })
            .catch((err) => {
                console.log(err); 
            }) 
        } else {
            this._api.putLike(this._cardId)
            .then((res) => {
                this._likeCount.textContent = res.likes.length;   
            })
            .catch((err) => {
                console.log(err);
            })
        }
        evt.target.classList.toggle('elements__like_active');
    };

    //Удаление карточки
    _deleteCard() {
        if (this._owner._id === this._myId) {
            this._trash.classList.add('elements__trash_active');
            
            this._trash.addEventListener('click', (evt) => {
                this._popupSubmit.open(),
                this._popupSubmit.setFormSubmit(() => {
                    this._api.deleteCardFromServer(this._cardId)
                        .then(() => {
                            this._popupSubmit.close();
                            evt.target.closest('.elements__card').remove();            
                        })
                        .catch((err) => {
                            console.log(err); 
                        })
                });
            });
        };
    };

    
    //Функция слушателей лайка и картинки
    _setEventListeners() {
        this._like.addEventListener('click', this._likeCard.bind(this));
        this._element.querySelector(".elements__image").addEventListener('click', () => this._handleCardClick(this._text, this._image));
    };

    //Генерация карточки
    generateCard() {
        this._title.textContent = this._text;
        this._picture.src = this._image;
        this._picture.alt = this._text;
        this._likeCount.textContent = this._likes.length;

        this._likes.some(like => {
            if (like._id === this._myId) {
            this._like.classList.add('elements__like_active')
            }
        });

        this._deleteCard();      

        this._setEventListeners();
    
        return this._element;
    };


};