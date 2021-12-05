import { createElement } from '../render.js';

const creatFilmExtraTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title"></h2>
  </section>`
);

export default class FilmExtraView {
  #element = null;
  #cards = null;
  constructor(cards) {
    this.#cards = cards;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return creatFilmExtraTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
