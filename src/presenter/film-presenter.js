import { remove, render, RenderPosition} from '../utils/render';
import SortView from '../view/sort-view';
import FilmView from '../view/film-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmCardView from '../view/film-card-view';
import {
  ActionType,
  closeKeyNameLong,
  closeKeyNameShort,
  FILM_COUNT_PER_STEP,
  FilterType, NoTasksTextType,
  SortType, UpdateType
} from '../const';
import PopupFilmView from '../view/film-popup-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmsListView from '../view/film-list-view';
import {getSortedFilms} from '../utils/films';
import {filter} from '../utils/filters';

const bodyElement = document.body;

export default class FilmsPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #boardComponent = new FilmView();
  #moreButtonComponent = new ShowMoreButtonView();


  #filmsListComponent = new FilmsListView('All movies. Upcoming');
  #filmsContainerComponent = new FilmListContainerView();
  #topFilmsComponent = new FilmsListView('Top rated');
  #viralFilmsComponent = new FilmsListView('Most commented');

  #detailsComponent = null;
  #noFilmsComponent = null;
  #sortComponent = null;

  #renderedCount = FILM_COUNT_PER_STEP;
  #renderedFilms = new Map;

  #sortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  constructor(boardContainer, filmsModel, commentsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    return this.#sortType === SortType.DEFAULT ? filteredFilms : getSortedFilms(filteredFilms, this.#sortType);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init = () => {
    render(this.#boardContainer, this.#boardComponent);

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
    this.#renderExtraFilms();
  }

  destroy = () => {
    this.#clearBoard({resetRenderedCount: true, resetSortType: true});
    this.#clearExtraFilms();

    remove(this.#boardComponent);

    this.#filmsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleSortTypeChange = (newSort) => {
    if (this.#sortType === newSort) {
      return;
    }

    this.#sortType = newSort;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#boardComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case ActionType.UPDATE_FILM:
        this.#filmsModel.update(updateType, update);
        break;
      case ActionType.ADD_COMMENT:
        this.#commentsModel.add(update);
        this.#filmsModel.addComment(updateType, update);
        break;
      case ActionType.DELETE_COMMENT:
        this.#commentsModel.delete(update);
        this.#filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#updateCard(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        if (this.#detailsComponent !== null) {
          this.#updateDetails(data);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  #updateDetails = (updatedFilm) => {
    if (this.#detailsComponent.filmData.id === updatedFilm.id) {
      this.#detailsComponent.updateData({
        film: updatedFilm,
        comments: this.#commentsModel.getFilmComment(updatedFilm)
      });
    }
  }

  #openDetails = (film) => {
    if (this.#detailsComponent !== null) {
      this.#closeDetails();
    }

    this.#detailsComponent = new PopupFilmView(film, this.#commentsModel.getFilmComment(film));

    bodyElement.classList.add('hide-overflow');
    render(bodyElement, this.#detailsComponent);

    this.#detailsComponent.setCloseDetailsHandler(this.#closeDetails);
    this.#detailsComponent.setControlClickHandler(this.#handleControlClick);
    this.#detailsComponent.setDeleteCommentHandler(this.#deleteComment);
  }

  #closeDetails = () => {
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handleKeydown);
    remove(this.#detailsComponent);
  }

  #handleKeydown = (evt) => {
    if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      this.#addComment();
      return;
    }

    if (evt.key === closeKeyNameShort || evt.key === closeKeyNameLong) {
      evt.preventDefault();
      this.#closeDetails();
    }
  }

  #updateCard = (updatedFilm) => {
    const filmCard = this.#renderedFilms.get(updatedFilm.id);

    if (filmCard) {
      filmCard.updateData(updatedFilm);
    }

    if (this.#detailsComponent !== null) {
      this.#updateDetails(updatedFilm);
    }

    this.#clearExtraFilms();
    this.#renderExtraFilms();
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

    this.#handleViewAction(ActionType.UPDATE_FILM, UpdateType.MINOR, updatedFilm);
  }

  #addComment = () => {
    const film = this.#detailsComponent.filmData;

    const comment = {
      id: this.comments[this.comments.length - 1].id + 1,
      comment: film.commentText,
      emotion: film.activeEmoji
    };

    if (comment.comment && comment.emotion) {
      this.#handleViewAction(ActionType.ADD_COMMENT, UpdateType.PATCH, {film, comment});
    }
  }

  #deleteComment = (id) => {
    this.#handleViewAction(ActionType.DELETE_COMMENT, UpdateType.PATCH, id);
  }

  #renderFilm = (container, film) => {
    const cardComponent = new FilmCardView(film);
    render(container, cardComponent);

    cardComponent.setOpenDetailsHandler(() => {
      this.#openDetails(cardComponent.filmData);
      document.addEventListener('keydown', this.#handleKeydown);
    });

    cardComponent.setControlClickHandler(this.#handleControlClick);

    return cardComponent;
  }

  #renderFilms = (films) => {
    films.forEach((film) => {
      const filmCard = this.#renderFilm(this.#filmsContainerComponent, film);
      this.#renderedFilms.set(film.id, filmCard);
    });
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new FilmsListView(NoTasksTextType[this.#filterType]);
    render(this.#boardComponent, this.#noFilmsComponent);
  }

  #handleMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedCount = Math.min(filmsCount, this.#renderedCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedCount, newRenderedCount);

    this.#renderFilms(films);
    this.#renderedCount = newRenderedCount;

    if (this.#renderedCount >= filmsCount) {
      remove(this.#moreButtonComponent);
    }
  }

  #renderMoreButton = () => {
    render(this.#filmsListComponent, this.#moreButtonComponent);
    this.#moreButtonComponent.setClickHandler(() => {
      this.#handleMoreButtonClick();
    });
  }

  #renderFullList = () => {
    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, this.#renderedCount));

    this.#filmsListComponent.element.querySelector('.films-list__title').classList.add('visually-hidden');
    render(this.#boardComponent, this.#filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmsListComponent, this.#filmsContainerComponent);

    this.#renderFilms(films);

    if (filmsCount > this.#renderedCount) {
      this.#renderMoreButton();
    }
  }

  #renderExtraList = (component, films) => {
    component.element.classList.add('films-list--extra');
    render(this.#boardComponent, component);

    const containerComponent = new FilmListContainerView();
    render(component, containerComponent);

    films.forEach((film) => this.#renderFilm(containerComponent, film));
  }

  #renderExtraFilms = () => {
    if (this.films.some(({info}) => info.filmRating > 0)) {
      this.#renderExtraList(this.#topFilmsComponent, this.#filmsModel.topFilms);
    }

    if (this.films.some(({comments}) => comments.length > 0)) {
      this.#renderExtraList(this.#viralFilmsComponent, this.#filmsModel.viralFilms);
    }
  }

  #clearExtraFilms = () => {
    remove(this.#topFilmsComponent);
    remove(this.#viralFilmsComponent);
  }

  #clearBoard = ({resetRenderedCount = false, resetSortType = false} = {}) => {
    this.#renderedFilms.forEach((card) => remove(card));
    this.#renderedFilms.clear();

    if (resetRenderedCount) {
      this.#renderedCount = FILM_COUNT_PER_STEP;
    }

    remove(this.#sortComponent);
    remove(this.#moreButtonComponent);
    remove(this.#filmsListComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetSortType) {
      this.#sortType = SortType.DEFAULT;
    }
  }

  #renderBoard = () => {
    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderSort();
    this.#renderFullList();
  };
}
