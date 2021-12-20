import {
  DESCRIPTION_COUNT,
  DESCRIPTION_COUNT_MAX
} from '../const.js';
import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const CONTROL_ACTIVE_CLASS = 'film-card__controls-item--active';

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
      <span class="film-card__genre">${info.genre[0]}</span>
    </p>
    <img src="${info.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
          <button name="watchlist" class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? CONTROL_ACTIVE_CLASS : ''}" type="button">Add to watchlist</button>
          <button name="watched" class="film-card__controls-item film-card__controls-item--mark-as-watched  ${userDetails.alreadyWatched ? CONTROL_ACTIVE_CLASS : ''}" type="button">Mark as watched</button>
          <button name="favorite" class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? CONTROL_ACTIVE_CLASS : ''}" type="button">Mark as favorite</button>
  </div>
</article>
  `;
};


export default class FilmCardView extends AbstractView {
  #film;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardControlsTemplate(this.#film);
  }

  get filmData() {
    return this.#film;
  }

  set filmData(filmData) {
    this.#film = filmData;
  }

  updateControl = (controlType) => {
    this.element.querySelector(`[name = ${controlType}]`).classList.toggle(CONTROL_ACTIVE_CLASS);
  }

  setOpenDetailsHandler = (callback) => {
    this._callback.openDetailsClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#openDetailsHandler);
  }

  setControlClickHandler = (callback) => {
    this._callback.controlClick = callback;
    this.element.querySelectorAll('.film-card__controls-item').forEach((control) => {
      control.addEventListener('click', this.#controlClickHandler);
    });
  }

  #openDetailsHandler = (evt) => {
    evt.preventDefault();
    this._callback.openDetailsClick();
  }

  #controlClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlClick(this.filmData, evt.target.getAttribute('name'));
  }

}
