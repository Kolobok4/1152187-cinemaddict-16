import {COMMENTS_COUNT, FILM_COUNT} from './const.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateComment} from './mock/comment';
import {render} from './utils/render';
import SiteMenuView from './view/site-menu-view';
import FilmsPresenter from './presenter/film-presenter';
import UserRatingView from './view/user-rating-view';
import {getFilmsCount} from './utils/get-films-count';
import {generateFilter} from './mock/filter';
import FooterStatsView from './view/footer-stats-view';

const filmsData = Array.from({length: FILM_COUNT}, generateFilmCard);
const commentsData = Array.from({length: COMMENTS_COUNT}, generateComment);
const filters = generateFilter(filmsData);
const alreadyWatchedCount = getFilmsCount(filmsData).alreadyWatched;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter(main);

render(main, new SiteMenuView(filters));
render(header, new UserRatingView(alreadyWatchedCount));
filmsPresenter.init(filmsData, commentsData);
render(footerStats, new FooterStatsView(filmsData.length));


