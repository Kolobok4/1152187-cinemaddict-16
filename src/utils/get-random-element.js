import {getRandomInteger} from './get-random-integer';

export const getRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};
