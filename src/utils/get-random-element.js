import {getRandomInteger} from './get-random-integer';

export const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
