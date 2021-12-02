import {
  titles,  actors,  commentAuthors,  countries,  descriptions,  genres,  images,  writers,  directors,  ageRating,
  releases, commentContent, emoji, dateComments
} from './data.js';

import {getRandomInteger} from '../utils/get-random-integer.js';
import {generateRandomContent} from '../utils/generate-random-content.js';

export const generateFilmCard = () => ({
  id: getRandomInteger(0, 1000),
  title: generateRandomContent(titles),
  originalTitle: generateRandomContent(titles),
  age: generateRandomContent(ageRating),
  commentAuthor: generateRandomContent(commentAuthors),
  countrie: generateRandomContent(countries),
  description: generateRandomContent(descriptions),
  poster: generateRandomContent(images),
  release: generateRandomContent(releases),
  director: generateRandomContent(directors),
  actor: generateRandomContent(actors),
  writer: generateRandomContent(writers),
  runtime: `${getRandomInteger(1, 2)}h ${getRandomInteger(0, 59)}m`,
  rating: getRandomInteger(1, 10),
  genre: generateRandomContent(genres),
  commentCount: `${getRandomInteger(0, 10)}`,
  isFavorite: Boolean(getRandomInteger(0, 1)),
  isWatchList: Boolean(getRandomInteger(0, 1)),
  isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
  commentMessage: generateRandomContent(commentContent),
  emotion: generateRandomContent(emoji),
  date: generateRandomContent(dateComments),
  filmCount: getRandomInteger(1, 25),
});

