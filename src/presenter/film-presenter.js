import {createElement, remove, render, RenderPosition} from '../utils/render';
import SortView from '../view/sort-view';
import FilmView from '../view/film-view';
import FilmListView from '../view/film-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmCardView from '../view/film-card-view';
import NoDataView from '../view/no-data-view';
import UserRatingView from '../view/user-rating-view';
import FooterStatsView from '../view/footer-stats-view';
import {closeKeyNameLong, closeKeyNameShort, FILM_COUNT_PER_STEP, SortType} from '../const';
import PopupFilmView from '../view/film-popup-view';
import FilmListContainerView from '../view/film-list-container-view';
import SiteMenuView from '../view/site-menu-view';
import dayjs from 'dayjs';

export default class FilmPresenter {
  #headerContainer = null;
  #filmContainer = null;
  #footerStatsContainer = null;

  #films = [];
  #filters = []

  #userRatingComponent = new UserRatingView();
  #sortComponent = new SortView();
  #filmComponent = new FilmView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmCardComponent = new FilmCardView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #noDataComponent = new NoDataView();
  #renderFilmCount = FILM_COUNT_PER_STEP;


  constructor( headerContainer, filmContainer, footerStatsContainer) {
    this.#headerContainer = headerContainer;
    this.#filmContainer = filmContainer;
    this.#footerStatsContainer = footerStatsContainer;
  }

  init = (films, filters) => {
    this.#films = [...films];
    this.#filters = filters;

    this.#renderNoData();
    this.#renderUserRating();
    this.#renderMenu();
    this.#renderSort();
    this.#renderFilmView();
    this.#renderFilmList();
    this.#renderFilmsList();
    this.#renderFooterStats();
  };

  #renderNoData = () => {
    if (this.#films.length === 0) {
      render(this.#filmListContainerComponent, this.#noDataComponent, RenderPosition.BEFOREEND);
    }
  };

  #renderUserRating = () => {
    render(this.#headerContainer, this.#userRatingComponent, RenderPosition.BEFOREEND);
  };

  #renderMenu = () => {
    render(this.#filmContainer, new SiteMenuView(this.#filters), RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    render(this.#filmContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmView = () => {
    render(this.#filmContainer, this.#filmComponent, RenderPosition.BEFOREEND);
  };

  #renderFilmList = () => {
    render(this.#filmComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
  };

  #renderFilmListContainer = () => {
    render(this.#filmListComponent, this.#filmListContainerComponent, RenderPosition.BEFOREEND);
  };

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);
    const popupComponent = new PopupFilmView(film);

    const showPopup = () => {
      document.body.classList.add('hide-overflow');
      render(document.body, popupComponent, RenderPosition.BEFOREEND);
    };

    const closePopup = () => {
      document.body.classList.remove('hide-overflow');
      popupComponent.element.remove();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
      }
    };

    filmCardComponent.setLinkClickHandler(() => {
      showPopup();
      document.addEventListener('keydown', onEscKeyDown, { once: true });
    });

    popupComponent.setCloseClickHandler(() => {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#filmListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  };

  #renderPopup = () => {

  };

  #renderFilms = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderFilmCard(film));
  };

  #renderFilmsList = () => {
    this.#renderFilmListContainer();
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };



  #showMoreButtonHandler= () => {
    this.#renderFilms(this.#renderFilmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP);
    this.#renderFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmListContainerComponent, this.#showMoreButtonComponent, RenderPosition.AFTEREND);
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonHandler);
  };

  #renderFooterStats = () => {
    render(this.#footerStatsContainer, new FooterStatsView(this.#films), RenderPosition.BEFOREEND);
  };

}
