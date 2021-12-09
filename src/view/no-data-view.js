import AbstractView from './abstract-view.js';


const createNoDataTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class NoDataView extends AbstractView {
  get template() {
    return createNoDataTemplate();
  }
}
