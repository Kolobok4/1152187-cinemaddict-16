import {getRandomInteger} from './get-random-integer';

export const getRandomElementsList = (elements) => elements.slice(getRandomInteger(0, elements.length - 1));
