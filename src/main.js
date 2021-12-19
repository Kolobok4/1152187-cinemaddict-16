import {RenderPosition, render, remove} from './utils/render.js';
import UserRatingView from './view/user-rating-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import FilmView from './view/film-view.js';
import FilmListView from './view/film-list-view.js';
import FilmListContainerView from './view/film-list-container-view.js';
import FilmCardView from './view/film-card-view.js';
import PopupFilmView from './view/film-popup-view.js';
import FooterStatsView from './view/footer-stats-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import {closeKeyNameLong, closeKeyNameShort, FILM_COUNT, FILM_COUNT_PER_STEP} from './const.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';
import NoDataView from './view/no-data-view.js';
import FilmPresenter from './presenter/film-presenter';


const header = document.querySelector('.header');
const main = document.querySelector('.main');
//const footer = document.querySelector('.footer');
const footerStats = document.querySelector('.footer__statistics');

const cards = Array.from({ length: FILM_COUNT }, generateFilmCard);
const filters = generateFilter(cards);


/*
const filmsComponent = new FilmView();
const filmListComponent = new FilmListView();
const filmListContainerComponent = new FilmListContainerView();
const showMoreButtonComponent = new ShowMoreButtonView();

const renderPopup = (film) => {
  if (document.body.querySelector('.film-details')) {
    document.body.querySelector('.film-details').remove();
  }

  const popupComponent = new PopupFilmView(film);

  render(document.body, popupComponent, RenderPosition.BEFOREEND);
  document.body.classList.add('hide-overflow');

  const removePopup = () => {
    remove(popupComponent);
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === closeKeyNameLong || evt.key === closeKeyNameShort) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  popupComponent.setCloseClickHandler(() => {
    removePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  document.addEventListener('keydown', onEscKeyDown);
};

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);

  filmComponent.setLinkClickHandler(() => {
    renderPopup(film);
  });

  const parent = filmListElement.container ? filmListElement.container : filmListElement;
  render(parent, filmComponent, RenderPosition.BEFOREEND);
};


render(header, new UserRatingView(), RenderPosition.BEFOREEND);
render(main, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(main, new SortView(), RenderPosition.BEFOREEND);
render(main, filmsComponent, RenderPosition.BEFOREEND);
render(filmsComponent, filmListComponent, RenderPosition.BEFOREEND);
render(filmListComponent, filmListContainerComponent, RenderPosition.BEFOREEND);
*/

/*
for (let i = 0; i < Math.min(cards.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmListContainerComponent, cards[i]);
}

if (cards.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  render(filmListContainerComponent, showMoreButtonComponent, RenderPosition.AFTEREND);

  showMoreButtonComponent.setClickHandler(() => {
    cards
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainerComponent, film));
    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= cards.length) {
      remove(showMoreButtonComponent);
    }

  });
}

if (cards.length === 0) {
  render(filmListContainerComponent, new NoDataView(), RenderPosition.BEFOREEND);
}

render(footerStats, new FooterStatsView(cards), RenderPosition.BEFOREEND);
*/

const filmPresenter = new FilmPresenter(header, main, footerStats);


filmPresenter.init(cards, filters);
