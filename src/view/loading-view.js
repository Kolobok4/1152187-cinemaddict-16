import {createElement} from '../render.js';


const createNoTaskTemplate  = () => (
  `
<h2 class="films-list__title">Loading...</h2>
`
);

export default class NoTaskView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoTaskTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
