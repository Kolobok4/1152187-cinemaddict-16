import {createNavigationTemplate} from './view/navigation-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createFilmListTemplate} from './view/film-list-view.js';
import {createShowMoreButton} from './view/show-more-button-view.js';
import {createFooterStatsTemplate} from './view/footer-stats';
import {createFilmDetailsPopupTemplate} from './view/film-details-view.js';
import {generateFilmCard} from './mock/film-card.js';
import {FILMS_COUNT_PER_STEP, FILMS_COUNT} from './const.js';
import {generateFilter} from './mock/filter.js';
import './utils/close-popup';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStats = footer.querySelector('.footer__statistics');

const getAllFilms = () => {
  const filmsList = [];
  for (let i = 0; i < FILMS_COUNT; i++) {
    filmsList.push(generateFilmCard());
  }
  return filmsList;
};

const filmsFixture = getAllFilms();

renderTemplate(header, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createNavigationTemplate(generateFilter(filmsFixture)), RenderPosition.BEFOREEND);
renderTemplate(main, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilmListTemplate(), RenderPosition.BEFOREEND);


const filmsListContainer = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(filmsFixture.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(filmsFixture[i]), RenderPosition.BEFOREEND);
}

const showFilmInfo = () => {
  const filmCards = document.querySelectorAll('.film-card');
  filmCards.forEach((filmCard, index) => {

    renderTemplate(footer, createFilmDetailsPopupTemplate(filmsFixture[index]), RenderPosition.AFTEREND);

  });


};

if (filmsFixture.length > FILMS_COUNT_PER_STEP) {
  let renderFilmCount = FILMS_COUNT_PER_STEP;
  renderTemplate(filmsListContainer, createShowMoreButton(), RenderPosition.AFTEREND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmsFixture
      .slice(renderFilmCount, renderFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainer, createFilmCardTemplate(film), RenderPosition.BEFOREEND));
    renderFilmCount += FILMS_COUNT_PER_STEP;

    if (renderFilmCount >= filmsFixture.length) {
      showMoreButton.remove();
    }

    showFilmInfo();
  });
}
renderTemplate(footerStats, createFooterStatsTemplate(filmsFixture), RenderPosition.BEFOREEND);

showFilmInfo();
