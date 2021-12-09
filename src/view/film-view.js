import AbstractView from './abstract-view.js';


const createFilmTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmView extends AbstractView {
  get template() {
    return createFilmTemplate();
  }
}
