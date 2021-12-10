import AbstractView from './abstract-view.js';


export const createFooterStatsTemplate = () => (
  '<p> movies inside</p>'
);

export default class FooterStatsView extends AbstractView {
  #counter = null;

  constructor(counter) {
    super();
    this.#counter = counter;
  }

  get template() {
    return createFooterStatsTemplate(this.#counter);
  }

}
