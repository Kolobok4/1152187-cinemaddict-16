import AbstractView from './abstract-view.js';


export const createFooterStatsTemplate = (count) => `<p>${count} movies inside </p>`;

export default class FooterStatsView extends AbstractView {
  #count = null;

  constructor(filmsModel) {
    super();
    this.#count = filmsModel.films.length;
  }

  get template() {
    return createFooterStatsTemplate(this.#count);
  }
}
