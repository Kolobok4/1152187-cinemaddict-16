import {setValidityCount} from '../utils/set-validity-count.js';
import {DESCRIPTION_COUNT} from '../const.js';

export const createFilmCardTemplate = (film) => {
  const {title, description, rating, genre, poster} = film;
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
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${setValidityCount(description, DESCRIPTION_COUNT)}</p>
        <span class="film-card__comments">83 comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};
