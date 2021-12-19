import {FILM_COUNT} from './const.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';

import FilmPresenter from './presenter/film-presenter';


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const cards = Array.from({ length: FILM_COUNT }, generateFilmCard);
const filters = generateFilter(cards);

const filmPresenter = new FilmPresenter(header, main, footerStats);


filmPresenter.init(cards, filters);
