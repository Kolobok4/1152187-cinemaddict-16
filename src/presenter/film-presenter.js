import { remove, render, RenderPosition} from '../utils/render';
import SortView from '../view/sort-view';
import FilmView from '../view/film-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmCardView from '../view/film-card-view';
import {
  ActionType, bodyElement, FILM_COUNT_PER_STEP,
  FilterType, keyName, NoFilmsText,
  SortType, State, UpdateType
} from '../const';
import PopupFilmView from '../view/film-popup-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmsListView from '../view/film-list-view';
import {getSortedFilms} from '../utils/films';
import {filter} from '../utils/filters';

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
  #commentedFilmsComponent = new FilmsListView('Most commented');
  #loadingComponent = new FilmsListView('Loading...');

  #detailsComponent = null;
  #noFilmsComponent = null;
  #sortComponent = null;

  #renderedCount = FILM_COUNT_PER_STEP;
  #renderedFilms = new Map;

  #sortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor(boardContainer, filmsModel, commentsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#commentsModel = commentsModel;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    return this.#sortType === SortType.DEFAULT ? filteredFilms : getSortedFilms(filteredFilms, this.#sortType);
  }

  init = () => {
    render(this.#boardContainer, this.#boardComponent);

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
  }

  destroy = () => {
    this.#clearBoard({resetRenderedCount: true, resetSortType: true});
    remove(this.#loadingComponent);
    remove(this.#boardComponent);

    this.#filmsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleSortTypeChange = (newSort) => {
    if (this.#sortType === newSort) {
      return;
    }

    this.#sortType = newSort;
    this.#clearFullList();
    this.#renderFullList();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#boardComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  #resetFormState = () => {
    this.#detailsComponent.updateData({
      isDisabled: false,
      deletingCommentId: null,
    });
  };

  #setViewState = (state, update) => {
    switch (state) {
      case State.SAVING: {
        this.#detailsComponent.updateData({
          isDisabled: true,
        });
        break;
      }
      case State.DELETING: {
        this.#detailsComponent.updateData({
          deletingCommentId: update
        });
        break;
      }
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case ActionType.UPDATE_FILM: {
        await this.#filmsModel.updateFilm(updateType, update);
        break;
      }
      case ActionType.ADD_COMMENT: {
        this.#setViewState(State.SAVING);
        try {
          await this.#commentsModel.add(updateType, update);
        } catch (err) {
          const shakeElement = this.#detailsComponent.element.querySelector('.film-details__new-comment');
          this.#detailsComponent.shake(shakeElement, this.#resetFormState);
        }
        break;
      }
      case ActionType.DELETE_COMMENT: {
        this.#setViewState(State.DELETING, update);
        try {
          await this.#commentsModel.delete(updateType, update);
        } catch (err) {
          const shakeElement = document.getElementById(`${update}`);
          this.#detailsComponent.shake(shakeElement, this.#resetFormState);
        }
        break;
      }
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#updateCard(data);
        break;
      }
      case UpdateType.MINOR: {
        this.#clearBoard();
        this.#renderBoard();
        if (this.#detailsComponent !== null) {
          this.#updateDetails(data);
        }
        break;
      }
      case UpdateType.MAJOR: {
        this.#clearBoard({resetRenderedCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      }
      case UpdateType.INIT: {
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      }
    }
  }

  #updateDetails = async (updatedFilm) => {
    if (this.#detailsComponent.filmData.id === updatedFilm.id) {
      this.#detailsComponent.updateData({
        film: updatedFilm,
        comments: await this.#commentsModel.getComments(updatedFilm.id),
        isDisabled: false,
        deletingCommentId: null
      });
    }
  }

  #openDetails = async (film) => {
    if (this.#detailsComponent !== null) {
      this.#closeDetails();
    }

    const comments = await this.#commentsModel.getComments(film.id);

    this.#detailsComponent = new PopupFilmView(film, comments);
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
    if (evt.key === keyName.SEND && (evt.ctrlKey || evt.metaKey)) {
      this.#addComment();
      return;
    }

    if (evt.key === keyName.CLOSE_SHORT || evt.key === keyName.CLOSE_LONG) {
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
    const filmId = film.id;

    const comment = {
      comment: film.commentText,
      emotion: film.activeEmoji
    };

    if (comment.comment && comment.emotion) {
      this.#handleViewAction(ActionType.ADD_COMMENT, UpdateType.PATCH, {filmId, comment});
    }
  }

  #deleteComment = (id) => {
    this.#handleViewAction(ActionType.DELETE_COMMENT, UpdateType.PATCH, id);
  }

  #renderCard = (container, film) => {
    const cardComponent = new FilmCardView(film);
    render(container, cardComponent);

    cardComponent.setOpenDetailsHandler(() => {
      this.#openDetails(cardComponent.filmData);
      document.addEventListener('keydown', this.#handleKeydown);
    });

    cardComponent.setControlClickHandler(this.#handleControlClick);

    return cardComponent;
  }

  #renderCards = (films) => {
    films.forEach((film) => {
      const filmCard = this.#renderCard(this.#filmsContainerComponent, film);
      this.#renderedFilms.set(film.id, filmCard);
    });
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new FilmsListView(NoFilmsText[this.#filterType]);
    render(this.#boardComponent, this.#noFilmsComponent);
  }

  #renderLoading = () => {
    render(this.#boardComponent, this.#loadingComponent);
  }

  #handleMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedCount = Math.min(filmsCount, this.#renderedCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedCount, newRenderedCount);

    this.#renderCards(films);
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

    this.#renderSort();

    render(this.#boardComponent, this.#filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmsListComponent, this.#filmsContainerComponent);

    this.#renderCards(films);

    if (filmsCount > this.#renderedCount) {
      this.#renderMoreButton();
    }
  }

  #renderExtraList = (component, films) => {
    component.element.classList.add('films-list--extra');
    render(this.#boardComponent, component);

    const containerComponent = new FilmListContainerView();
    render(component, containerComponent);

    films.forEach((film) => this.#renderCard(containerComponent, film));
  }

  #renderExtraFilms = () => {
    if (this.films.some(({filmInfo}) => filmInfo.totalRating > 0)) {
      this.#renderExtraList(this.#topFilmsComponent, this.#filmsModel.topFilms);
    }

    if (this.films.some(({comments}) => comments.length > 0)) {
      this.#renderExtraList(this.#commentedFilmsComponent, this.#filmsModel.commentedFilms);
    }
  }

  #clearExtraFilms = () => {
    remove(this.#topFilmsComponent);
    remove(this.#commentedFilmsComponent);
  }

  #clearFullList = ({resetRenderedCount = false} = {}) => {
    this.#renderedFilms.forEach((film) => remove(film));
    this.#renderedFilms.clear();

    if (resetRenderedCount) {
      this.#renderedCount = FILM_COUNT_PER_STEP;
    }

    remove(this.#sortComponent);
    remove(this.#moreButtonComponent);
    remove(this.#filmsListComponent);
  }

  #clearBoard = ({resetRenderedCount = false, resetSortType = false} = {}) => {
    this.#clearFullList({resetRenderedCount: resetRenderedCount});
    this.#clearExtraFilms();

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetSortType) {
      this.#sortType = SortType.DEFAULT;
    }
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFullList();
    this.#renderExtraFilms();
  };
}
