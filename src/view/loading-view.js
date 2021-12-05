import {createElement} from '../render.js';


const createNoFilmTemplate = () => (
  '<h2 class="films-list__title">Loading...</h2>'
);

export default class View {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoFilmTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
