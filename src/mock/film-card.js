import {
  titles,
  actors,
  authors,
  countries,
  descriptions,
  genres,
  images,
  writers,
  directors,
  commentContent,
  ageRating
} from './data.js';
import {getRandomInteger} from '../utils/get-random-integer.js';
import {generateRandomContent} from '../utils/generate-random-content.js';
import {getRandomNumber} from '../utils/get-random-number.js';

export const generateFilmCard = () => ({
  id: getRandomInteger(0, 1000),
  title: generateRandomContent(titles),
  age: generateRandomContent(ageRating),
  author: generateRandomContent(authors),
  countrie: generateRandomContent(countries),
  description: generateRandomContent(descriptions),
  poster: generateRandomContent(images),
  //release: generateRandomContent(releases),
  director: generateRandomContent(directors),
  actor: generateRandomContent(actors),
  writer: generateRandomContent(writers),
  //runtime: generateRandomContent(runtimes),
  rating: getRandomNumber(1, 10),
  //genre: generateRandomContent(genres),
  //comment: generateRandomContent().map((commentContent) => commentContent.id),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  isWatchList: Boolean(getRandomInteger(0, 1)),
  isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
});


