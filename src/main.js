import {API_AUTHORIZATION, API_URL, ScreenType} from './const.js';
import {render} from './utils/render';
import FilmsPresenter from './presenter/film-presenter';
import UserRatingView from './view/user-rating-view';
import FooterStatsView from './view/footer-stats-view';
import NavigationPresenter from './presenter/navigation-presenter';
import FilterModel from './models/filter-model';
import CommentsModel from './models/comments-model';
import FilmsModel from './models/films-model';
import StatsPresenter from './presenter/stats-presenter';
import ApiService from './api';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const apiService = new ApiService(API_URL, API_AUTHORIZATION);

const filmsModel = new FilmsModel(apiService);
const commentsModel = new CommentsModel(apiService, filmsModel);
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(main, filmsModel, commentsModel, filterModel);
const statsPresenter = new StatsPresenter(main, filmsModel);

const handleNavigationClick = (screenType) => {
  if (screenType === ScreenType.STATS) {
    filmsPresenter.destroy();
    statsPresenter.init();
    return;
  }

  statsPresenter.destroy();
  filmsPresenter.init();
};

const navigationPresenter = new NavigationPresenter(main, filterModel, filmsModel, handleNavigationClick);

navigationPresenter.init();
filmsPresenter.init();

filmsModel.init().finally(() => {
  render(header, new UserRatingView(filmsModel));
  render(footerStats, new FooterStatsView(filmsModel));
});
