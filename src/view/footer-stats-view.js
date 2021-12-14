import AbstractView from './abstract-view.js';


export const createFooterStatsTemplate = (films) => `<p>${films.length} movies inside </p>`;

export default class FooterStatsView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFooterStatsTemplate(this.#films);
  }

}
