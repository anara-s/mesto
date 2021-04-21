import Popup from './Popup.js' 

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
      super(popupSelector);
    };
  
  
    open(text, image) {
        this._popup.querySelector('.popup__image').src = image;
        this._popup.querySelector('.popup__image').alt = text;
        this._popup.querySelector('.popup__text').textContent = text;
        
        super.open();      
    };
 

};