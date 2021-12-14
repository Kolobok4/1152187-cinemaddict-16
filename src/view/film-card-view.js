import {DESCRIPTION_COUNT, DESCRIPTION_COUNT_MAX} from '../const.js';
import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createFilmCardControlsTemplate = (film) => {
  const { comments, info, userDetails} = film;
  const description = info.description.length > DESCRIPTION_COUNT_MAX ? info.description.slice(0, DESCRIPTION_COUNT).concat('...') : info.description;
  const date = dayjs(info.release.date).format('YYYY');

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${info.title}</h3>
    <p class="film-card__rating">${info.filmRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${info.runtime}</span>
      <span class="film-card__genre">${info.genre.join(', ')}</span>
    </p>
    <img src=./images/posters/${info.poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>
</article>
  `;
};


export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardControlsTemplate(this.#film);
  }

  setLinkClickHandler = (callback) => {
    this._callback.linkClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler);
  }

  #linkClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.linkClick();
  }

}
