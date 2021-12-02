import {getRandomInteger} from '../utils/get-random-integer.js';
import {
  titles,
  actors,
  comementAuthors,
  countries,
  descriptions,
  genres,
  images,
  writers,
  directors,
  ageRating
} from './data.js';

export const generatePopap = (filmCard) => ({
  poster: filmCard.poster,
  name: filmCard.name,
  originalName: filmCard.name,
  rating: filmCard.rating,
  director: directors[getRandomInteger(0, directors.length - 1)],
  writers: writers.slice(0, getRandomInteger(1, writers.length - 1)),
  actors: actors.slice(0, getRandomInteger(0, actors.length - 1)),
  year: filmCard.year,
  runtime: filmCard.runtime,
  country: `${countries[getRandomInteger(0, countries.length - 1)]}`,
  genres: filmCard.genres,
  age: `${getRandomInteger(4, 18)}+`,
  description: filmCard.description
});

