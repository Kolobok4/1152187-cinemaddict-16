import {getRandomInteger} from './get-random-integer';

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));
