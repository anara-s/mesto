export default class Section {
    constructor(containerSelector) {
      this._container = document.querySelector(containerSelector);
    }

    //Добавление карточки
    addItem(element) {
      this._container.prepend(element);
    }
  
    //Рендеринг карточек
    renderItems({ items, renderer }) {  
      
      items.forEach(item => {
        renderer(item);
      });
    }
  }