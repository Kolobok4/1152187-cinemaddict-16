import {getRandomPositiveFloat} from '../utils/get-random-positive-float';
import {getRandomElement} from '../utils/get-random-element';
import {getRandomElementsList} from '../utils/get-random-element-list';
import {getRandomBoolean} from '../utils/get-random-boolean';
import {Film, FilmsRating, IMAGES, TITLES} from './data';
import {generateCommentsId} from '../utils/get-comments-id';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/get-random-integer';
import {getRandomDate} from '../utils/get-random-date';


export const generateFilmCard = () => ({
  id: nanoid(),
  info: {
    title: getRandomElement(TITLES),
    filmRating: getRandomPositiveFloat(FilmsRating.MIN, FilmsRating.MAX, FilmsRating.DECIMALS),
    poster: getRandomElement(IMAGES),
    ageRating: getRandomElement(Film.AGE_RATINGS),
    director: getRandomElement(Film.DIRECTORS),
    writers: getRandomElementsList(Film.WRITERS),
    actors: getRandomElementsList(Film.ACTORS),
    release: {
      date: getRandomDate(30, 1),
      country: getRandomElement(Film.COUNTRIES),
    },
    runtime: getRandomInteger(30, 180),
    genre: getRandomElementsList(Film.GENRES),
    description: getRandomElement(Film.DESCRIPTIONS),
  },
  userDetails: {
    watchlist: getRandomBoolean(),
    alreadyWatched: getRandomBoolean(),
    watchingDate: getRandomDate(5, 1),
    favorite: getRandomBoolean(),
  },
  comments: generateCommentsId(),
});

