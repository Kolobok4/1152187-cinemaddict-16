import {titles, ageRating, actors, authors, countries, descriptions, genres, images, writers, directors, originalTitles, commentContent} from './data.js';
import {getRandomInteger} from '../utils/get-random-integer.js';
import {generateRandomContent} from '../utils/generate-random-content.js';
import {getRandomNumber} from '../utils/get-random-number.js';

export const generateFilmCard = () => ({
  id: getRandomInteger(0, 1000),
  title: generateRandomContent(titles),
  //ageRating: generateRandomContent(ageRating),
  //author: generateRandomContent(authors),
  //countrie: generateRandomContent(countries),
  //originalTitle: generateRandomContent(originalTitles),
  description: generateRandomContent(descriptions),
  poster: generateRandomContent(images),
  //release: generateRandomContent(releases),
  //isFavorite: Boolean(getRandomInteger(0, 1)),
  //isWatchList: Boolean(getRandomInteger(0, 1)),
  //isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
  //director: generateRandomContent(directors),
  //actor: generateRandomContent(actors),
  //writers: generateRandomContent(writers),
  //runtime: generateRandomContent(runtimes),
  rating: getRandomNumber(1, 10),
  genre: generateRandomContent(genres),
  //comment: generateRandomContent().map((commentContent) => commentContent.id),
});


