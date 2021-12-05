import {RenderPosition, render} from './render.js';
import UserRatingView from './view/user-rating-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import FilmView from './view/film-view.js';
import FilmListView from './view/film-list-view.js';
import FilmListContainerView from './view/film-list-container-view.js';
import FilmCardView from './view/film-card-view.js';
import PopupFilmView from './view/film-popup-view.js';
import FooterStatsView from './view/footer-stats.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import {FILM_COUNT, FILM_COUNT_PER_STEP} from './const.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';
import  './utils/close-popup.js';


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStats = footer.querySelector('.footer__statistics');

const cards = Array.from({ length: FILM_COUNT }, generateFilmCard);
const filters = generateFilter(cards);

const filmsComponent = new FilmView();
const filmListComponent = new FilmListView();
const filmListContainerComponent = new FilmListContainerView();

const renderFilm = (containerElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmPopupComponent = new PopupFilmView(film);
  const body = document.body;
  filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    containerElement.appendChild(filmPopupComponent.element);
    body.classList.add('hide-overflow');
  });

  filmPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    containerElement.removeChild(filmPopupComponent.element);
    body.classList.remove('hide-overflow');
  });
  render(containerElement, filmComponent.element, RenderPosition.BEFOREEND);
};

render(header, new UserRatingView().element, RenderPosition.BEFOREEND);
render(main, new SiteMenuView(filters).element, RenderPosition.BEFOREEND);
render(main, new SortView().element, RenderPosition.BEFOREEND);
render(main, filmsComponent.element, RenderPosition.BEFOREEND);
render(filmsComponent.element, filmListComponent.element, RenderPosition.BEFOREEND);
render(filmListComponent.element, filmListContainerComponent.element, RenderPosition.BEFOREEND);


for (let index = 0; index < Math.min(cards.length, FILM_COUNT_PER_STEP); index++) {
  renderFilm(filmListContainerComponent.element, cards[index]);
}


if (cards.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  render(filmListContainerComponent.element, new ShowMoreButtonView().element, RenderPosition.AFTEREND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    cards
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainerComponent.element, film));
    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= cards.length) {
      showMoreButton.remove();
    }

  });
}
render(footerStats, new FooterStatsView()._element, RenderPosition.BEFOREEND);


