import {generateComments} from './comment';
import {getRandomPositiveFloat} from '../utils/get-random-positive-float';
import {getRandomElement} from '../utils/get-random-element';
import {getRandomElementsList} from '../utils/get-random-element-list';
import {generateReleaseDate} from '../utils/generate-release-date';
import {generateRuntime} from '../utils/generate-runtime';
import {getRandomBoolean} from '../utils/get-random-boolean';
import {getRandomDate} from '../utils/get-random-date';
import {generateRandomContent} from '../utils/generate-random-content';
import {Film, FilmsRating, IMAGES, TITLES} from './data';

export const generateFilmCard = () => ({
  comments: generateComments(),
  info: {
    title: generateRandomContent(TITLES),
    filmRating: getRandomPositiveFloat(FilmsRating.MIN, FilmsRating.MAX, FilmsRating.DECIMALS),
    poster: generateRandomContent(IMAGES),
    ageRating: getRandomElement(Film.AGE_RATINGS),
    director: getRandomElement(Film.DIRECTORS),
    writers: getRandomElementsList(Film.WRITERS),
    actors: getRandomElementsList(Film.ACTORS),
    release: {
      date: generateReleaseDate(),
      country: getRandomElement(Film.COUNTRIES),
    },
    runtime: generateRuntime(),
    genre: getRandomElementsList(Film.GENRES),
    description: getRandomElement(Film.DESCRIPTIONS),
  },
  userDetails: {
    watchList: getRandomBoolean(),
    alreadyWatched: getRandomBoolean(),
    watchingDate: getRandomDate(),
    favorite: getRandomBoolean(),
  }
});

