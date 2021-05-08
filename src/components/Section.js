export default class Section {
    constructor(renderer, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    //Добавление карточки
    addItem(element) {
      this._container.prepend(element);
    }
  
    //Рендеринг карточек
    renderItems(items) {  
      items.forEach(item => {
        this._renderer(item);
      });
    }
  }