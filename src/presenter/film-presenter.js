import { remove, render, RenderPosition} from '../utils/render';
import SortView from '../view/sort-view';
import FilmView from '../view/film-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmCardView from '../view/film-card-view';
import {closeKeyNameLong, closeKeyNameShort, EXTRA_FILM_COUNT, FILM_COUNT_PER_STEP} from '../const';
import PopupFilmView from '../view/film-popup-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmsListView from '../view/film-list-view';
import {updateItem} from '../utils/update-item';
import {getSortedFilms} from '../utils/get-films-count';

const bodyElement = document.body;

export default class FilmsPresenter {
  #boardContainer = null;

  #boardComponent = new FilmView();
  #sortComponent = new SortView();
  #moreButtonComponent = new ShowMoreButtonView();

  #noFilmsComponent = null;
  #filmsListComponent = new FilmsListView('All movies. Upcoming');
  #filmsContainerComponent = new FilmListContainerView();
  #topFilmsComponent = new FilmsListView('Top rated');
  #viralFilmsComponent = new FilmsListView('Most commented');
  #detailsComponent = null;

  #films = [];
  #comments = [];
  #renderedCount = FILM_COUNT_PER_STEP;
  #renderedFilms = new Map;

  #sortType = 'default';
  #sourcedFilms = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (films, comments) => {
    this.#films = [...films];
    this.#comments = [...comments];
    this.#sourcedFilms = [...films];

    render(this.#boardContainer, this.#boardComponent);
    this.#renderBoard();
  }

  #sort = (newSort) => {
    if (newSort === 'default') {
      this.#films = [...this.#sourcedFilms];
    } else {
      this.#films = getSortedFilms(this.#films, newSort);
    }

    this.#sortType = newSort;
  }

  #handleSortTypeChange = (newSort) => {
    if (newSort === this.#sortType) {
      return;
    }

    this.#sort(newSort);
    this.#updateFullList();
  }

  #renderSort = () => {
    render(this.#boardComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #openDetails = (film) => {
    if (this.#detailsComponent !== null) {
      this.#closeDetails();
    }

    const filmComments = this.#comments.filter((comment) => film.comments.includes(comment.id));
    this.#detailsComponent = new PopupFilmView(film, filmComments);

    bodyElement.classList.add('hide-overflow');
    render(bodyElement, this.#detailsComponent);

    this.#detailsComponent.setCloseDetailsHandler(this.#closeDetails);
    this.#detailsComponent.setControlClickHandler(this.#handleControlClick);
  }

  #closeDetails = () => {
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this.#detailsComponent);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === closeKeyNameShort || evt.key === closeKeyNameLong) {
      evt.preventDefault();
      this.#closeDetails();
    }
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    const filmCard = this.#renderedFilms.get(updatedFilm.id);

    if (filmCard) {
      filmCard.updateData(updatedFilm);
    }

    if (this.#detailsComponent !== null && this.#detailsComponent.filmData.id === updatedFilm.id) {
      this.#detailsComponent.updateData(updatedFilm);
    }

    this.#updateExtraLists();
  }

  #handleControlClick = (film, controlType) => {
    let updatedFilm = null;

    if (controlType === 'watchlist') {
      updatedFilm = {
        ...film,
        userDetails: {
          ...film.userDetails,
          watchlist: !film.userDetails.watchlist
        }
      };
    }

    if (controlType === 'watched') {
      updatedFilm = {
        ...film,
        userDetails: {
          ...film.userDetails,
          alreadyWatched: !film.userDetails.alreadyWatched,
          watchingDate: !film.userDetails.alreadyWatched ? new Date() : null
        }
      };
    }

    if (controlType === 'favorite') {
      updatedFilm = {
        ...film,
        userDetails: {
          ...film.userDetails,
          favorite: !film.userDetails.favorite
        }
      };
    }

    this.#handleFilmChange(updatedFilm);
  }

  #renderFilm = (container, film) => {
    const cardComponent = new FilmCardView(film);
    render(container, cardComponent);

    cardComponent.setOpenDetailsHandler(() => {
      this.#openDetails(cardComponent.filmData);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    cardComponent.setControlClickHandler(this.#handleControlClick);

    return cardComponent;
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => {
        const filmCard = this.#renderFilm(this.#filmsContainerComponent, film);
        this.#renderedFilms.set(film.id, filmCard);
      });
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new FilmsListView('There are no movies in our database');
    render(this.#boardComponent, this.#noFilmsComponent);
  }

  #handleMoreButtonClick = () => {
    this.#renderFilms(this.#renderedCount, this.#renderedCount + FILM_COUNT_PER_STEP);
    this.#renderedCount += FILM_COUNT_PER_STEP;

    if (this.#renderedCount >= this.#films.length) {
      remove(this.#moreButtonComponent);
    }
  }

  #renderMoreButton = () => {
    render(this.#filmsContainerComponent, this.#moreButtonComponent, RenderPosition.AFTEREND);
    this.#moreButtonComponent.setClickHandler(() => {
      this.#handleMoreButtonClick();
    });
  }

  #renderFullList = () => {
    this.#filmsListComponent.element.querySelector('.films-list__title').classList.add('visually-hidden');

    render(this.#sortComponent, this.#filmsListComponent, RenderPosition.AFTEREND);
    render(this.#filmsListComponent, this.#filmsContainerComponent);

    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderMoreButton();
    }
  }

  #updateFullList = () => {
    this.#renderedFilms.forEach((card) => remove(card));
    this.#renderedFilms.clear();
    this.#renderedCount = FILM_COUNT_PER_STEP;

    remove(this.#moreButtonComponent);
    remove(this.#filmsListComponent);

    this.#renderFullList();
  }

  #renderTopFilms = () => {
    const topRatedFilms = [...this.#films]
      .sort((current, next) => next.info.filmRating - current.info.filmRating)
      .slice(0, EXTRA_FILM_COUNT);

    this.#topFilmsComponent.element.classList.add('films-list--extra');
    render(this.#boardComponent, this.#topFilmsComponent);

    const filmsContainerComponent = new FilmListContainerView();
    render(this.#topFilmsComponent, filmsContainerComponent);

    topRatedFilms.forEach((film) => this.#renderFilm(filmsContainerComponent, film));
  }

  #renderMostCommentedFilms = () => {
    const mostCommentedFilms = [...this.#films]
      .sort((current, next) => next.comments.length - current.comments.length)
      .slice(0, EXTRA_FILM_COUNT);

    this.#viralFilmsComponent.element.classList.add('films-list--extra');
    render(this.#boardComponent, this.#viralFilmsComponent);

    const filmsContainerComponent = new FilmListContainerView();
    render(this.#viralFilmsComponent, filmsContainerComponent);

    mostCommentedFilms.forEach((film) => this.#renderFilm(filmsContainerComponent, film));
  }

  #renderExtraLists = () => {
    if (this.#films.some(({info}) => info.filmRating > 0)) {
      this.#renderTopFilms();
    }

    if (this.#films.some(({comments}) => comments.length > 0)) {
      this.#renderMostCommentedFilms();
    }
  }

  #updateExtraLists = () => {
    remove(this.#topFilmsComponent);
    remove(this.#viralFilmsComponent);

    this.#renderExtraLists();
  }

  #renderBoard = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFullList();
    this.#renderExtraLists();
  };
}
