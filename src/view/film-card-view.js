import {setValidityCount} from '../utils/set-validity-count.js';
import {DESCRIPTION_COUNT} from '../const.js';

const createFilmCardControlsTemplate = (isAlreadyWatched, isFavorite, isWatchList) => (`<div class="film-card__controls">
      <button class="film-card__controls-item ${isWatchList ? 'film-card__controls-item--active' : ''} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${isAlreadyWatched ? 'film-card__controls-item--active' : ''} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${isFavorite ? 'film-card__controls-item--active' : ''} film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>`);

export const createFilmCardTemplate = (film) => {
  const {title, description, rating, genre, poster, comment, isAlreadyWatched, isFavorite, isWatchList} = film;
  const controlsTemplateButton = createFilmCardControlsTemplate(isAlreadyWatched, isFavorite, isWatchList);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title ? title : ''}</h3>
        <p class="film-card__rating">${rating ? rating : ''}</p>
        <p class="film-card__info">
          <span class="film-card__year">1933</span>
          <span class="film-card__duration">54m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title ? title : ''}" class="film-card__poster">
        <p class="film-card__description">${setValidityCount(description, DESCRIPTION_COUNT)}</p>
        <span class="film-card__comments">comments</span>
      </a>
      ${controlsTemplateButton}
    </article>`
  );
};