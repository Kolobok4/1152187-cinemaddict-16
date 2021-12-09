import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createFilmControlsTemplate = (film) => {
  const { isFavorite, isAlreadyWatched, isWatchList } = film;

  return (`
    <button type="button" class="film-details__control-button ${isWatchList ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${isAlreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  `);
};
const createCommentTemplate = (comments) => {

  const { commentAuthor, date, emotion, commentMessage } = comments;
  const fullDate = dayjs(date).format('YYYY/MM/D H:mm');

  return (`
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${commentMessage}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${commentAuthor}</span>
            <span class="film-details__comment-day">${fullDate}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `);

};

export const createFilmPopupTemplate = (film) => {

  const {title, description, rating, poster, age, director, writer, actor, countrie, release, runtime, genre, commentCount} = film;
  const reliesFilmDate = dayjs(release.date).format('D MMMM YYYY');

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
            <p class="film-details__age">${age ? age : ''}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title ? title : ''}</h3>
              <p class="film-details__title-original">Original: ${title ? title : ''}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating ? rating : ''}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director ? director : ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writer ? writer : ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actor ? actor : ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${reliesFilmDate ? reliesFilmDate : ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime ? runtime : ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${countrie ? countrie : ''}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre ? genre : ''}</span>
</td>
            </tr>
          </table>
          <p class="film-details__film-description">${description ? description : ''}</p>
        </div>
      </div>
      <section class="film-details__controls">
        ${createFilmControlsTemplate(film)}
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount ? commentCount : ''}</span>
        </h3>
        <ul class="film-details__comments-list">
          ${createCommentTemplate(film)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>`
  );
};

export default class PopupFilmView extends AbstractView {
  #cards = null;

  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get template() {
    return createFilmPopupTemplate(this.#cards);
  }

}
