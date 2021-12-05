import {createElement} from '../render.js';


const createFilmTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
