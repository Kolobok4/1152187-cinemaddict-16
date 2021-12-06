import {createElement} from '../render.js';


const createNoDataTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class NoDataView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoDataTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
