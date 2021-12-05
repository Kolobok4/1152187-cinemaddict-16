import {createElement} from '../render.js';


export const createFooterStatsTemplate = () => (
  '<p> movies inside</p>'
);

export default class FooterStatsView {
  #element = null;
  #counter = null;
  constructor(counter) {
    this.#counter = counter;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatsTemplate(this.#counter);
  }

  removeElement() {
    this.#element = null;
  }
}
