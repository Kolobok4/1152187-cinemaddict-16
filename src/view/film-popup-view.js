import AbstractView from './abstract-view.js';
import {EMOTIONS} from '../mock/data';

const CONTROL_ACTIVE_CLASS = 'film-details__control-button--active';

const createFilmsGenreTemplate = (genre) => (
  `<span class="film-details__genre">${genre}</span>`
);

const createEmojiItemTemplate = (emoji) => (
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`
);

const createFilmPopupTemplate = ({info, userDetails, comments}) => {
  const genresNaming = info.genre.length > 1 ? 'Genres' : 'Genre';

  const genres = info.genre.map(createFilmsGenreTemplate).join('');

  const commentsQuantity = comments.length;
  const emojiList = EMOTIONS.map(createEmojiItemTemplate).join('\n');

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
</div>
<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${info.poster}" alt="">
      <p class="film-details__age">${info.ageRating}</p>
  </div>
  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${info.title}</h3>
        <p class="film-details__title-original">Original: ${info.title}</p>
      </div>
      <div class="film-details__rating">
        <p class="film-details__total-rating">${info.filmRating}</p>
      </div>
    </div>
    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${info.director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${info.writers.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${info.actors.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${info.release.date}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${info.runtime}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${info.release.country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">${genresNaming}</td>
                <td class="film-details__cell">
                  ${genres}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${info.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button name="watchlist" type="button" class="film-details__control-button film-details__control-button--watchlist ${userDetails.watchlist ? CONTROL_ACTIVE_CLASS : ''}" id="watchlist">Add to watchlist</button>
          <button name="watched" type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched ? CONTROL_ACTIVE_CLASS : ''}" id="watched">Already watched</button>
          <button name="favorite" type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite ? CONTROL_ACTIVE_CLASS : ''}" id="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

          <ul class="film-details__comments-list">
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojiList}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupFilmView extends AbstractView {
  #film;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmPopupTemplate(this.#film);
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

  setCloseDetailsHandler = (callback) => {
    this._callback.closeDetailsClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeDetailsHandler);
  }

  setControlClickHandler = (callback) => {
    this._callback.controlClick = callback;
    this.element.querySelectorAll('.film-details__control-button').forEach((control) => {
      control.addEventListener('click', this.#controlClickHandler);
    });
  }

  #closeDetailsHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeDetailsClick();
  }

  #controlClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlClick(this.filmData, evt.target.getAttribute('name'));
  }
}
