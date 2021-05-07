import Popup from './Popup.js' 

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
      super(popupSelector);
      this._picture = this._popup.querySelector('.popup__image');
      this._title = this._popup.querySelector('.popup__text');
    };
  
// Открытие окна с картинкой  
    open(text, image) {
      this._picture.src = image;
      this._picture.alt = text;
      this._title.textContent = text;
        
        super.open();      
    };
 

};