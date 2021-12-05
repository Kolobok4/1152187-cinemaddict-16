import {createElement} from '../render.js';


export const createFooterStatsTemplate = (moviesCount) => {
  const statisticsTitle = moviesCount !== 0 ? `${moviesCount} movies inside` : '0 movies inside';

  return (
    `<section class="footer__statistics">
        <p>${statisticsTitle}</p>
    </section>`
  );
};

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
