import {COMMENTS_COUNT, FILM_COUNT} from './const.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateComment} from './mock/comment';
import {render} from './utils/render';
import FilmsPresenter from './presenter/film-presenter';
import UserRatingView from './view/user-rating-view';
import FooterStatsView from './view/footer-stats-view';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './models/filter-model';
import CommentsModel from './models/comments-model';
import FilmsModel from './models/films-model';

const films = Array.from({length: FILM_COUNT}, generateFilmCard);
const comments = Array.from({length: COMMENTS_COUNT}, generateComment);

const filmsModel = new FilmsModel();
filmsModel.films = films;

const commentsModel = new CommentsModel();
commentsModel.comments = comments;

const filterModel = new FilterModel();

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const filmsPresenter = new FilmsPresenter(main, filmsModel, commentsModel, filterModel);
const filtersPresenter = new FilterPresenter(main, filterModel, filmsModel);


render(header, new UserRatingView(filmsModel));
filtersPresenter.init();
filmsPresenter.init();
render(footerStats, new FooterStatsView(films.length));


