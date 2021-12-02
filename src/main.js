import {createNavigationTemplate} from './view/navigation-view.js';
import {RenderPosition, renderTemplate} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createShowMoreButton} from './view/show-more-button-view.js';
import {createFooterStatsTemplate} from './view/footer-stats';
import {createFilmDetailsPopupTemplate} from './view/film-popup-view.js';
import {generateFilmCard} from './mock/film-card.js';
import {FILMS_COUNT, FILMS_COUNT_PER_STEP} from './const.js';
import {generateFilter} from './mock/filter.js';
import {createFilmTemplate} from './view/film-view.js';


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStats = footer.querySelector('.footer__statistics');

const cards = Array.from({ length: FILMS_COUNT }, generateFilmCard);
const filters = generateFilter(cards);

renderTemplate(header, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createNavigationTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(main, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilmTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footerStats, createFooterStatsTemplate(cards), RenderPosition.BEFOREEND);


const filmMainElement = main.querySelector('.films-list');
const filmListElement = filmMainElement.querySelector('.films-list__container');


for (let index = 0; index < Math.min(cards.length, FILMS_COUNT_PER_STEP); index++) {
  renderTemplate(filmListElement, createFilmCardTemplate(cards[index]), RenderPosition.BEFOREEND);
}


const showFilmInfo = () => {
  const filmCards = document.querySelectorAll('.film-card');
  filmCards.forEach((filmCard, index) => {
    filmCard.onclick = () => {

      renderTemplate(footer, createFilmDetailsPopupTemplate(cards[index]), RenderPosition.AFTEREND);

    };
  });
};

if (cards.length > FILMS_COUNT_PER_STEP) {
  let renderCount = FILMS_COUNT_PER_STEP;
  renderTemplate(filmMainElement, createShowMoreButton(), RenderPosition.BEFOREEND);

  const loadButton = filmMainElement.querySelector('.films-list__show-more');
  loadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderCount, renderCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => renderTemplate(filmListElement, createFilmCardTemplate(card), RenderPosition.BEFOREEND));

    renderCount += FILMS_COUNT_PER_STEP;

    if (renderCount >= cards.length) {
      loadButton.remove();
    }
    showFilmInfo();
  });
}
showFilmInfo();
