import AbstractView from './abstract-view.js';

const creatFilmExtraTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title"></h2>
  </section>`
);

export default class FilmExtraView extends AbstractView {
  #cards = null;

  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get template() {
    return creatFilmExtraTemplate(this.#cards);
  }

}
