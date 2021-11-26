import {createNavigationTemplate} from './view/navigation-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createFilmListTemplate} from './view/film-list-view.js';
import {createShowMoreButton} from './view/show-more-button-view.js';
import {createFooterStatsTemplate} from './view/footer-stats';
import {createFilmDetailsPopupTemplate} from './view/film-details-view.js';


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStats = footer.querySelector('.footer__statistics');

const FILMS_COUNT = 5;

renderTemplate(header, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createNavigationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmList = main.querySelector('.films-list');
const filmContainer = filmList.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT; i++) {
  renderTemplate(filmContainer, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(filmList, createShowMoreButton(), RenderPosition.BEFOREEND);
renderTemplate(footerStats, createFooterStatsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footer, createFilmDetailsPopupTemplate(), RenderPosition.BEFOREEND);

