import {getRandomInteger} from './get-random-integer.js';

export const generateRandomContent = (content) => {

  const randomIndex = getRandomInteger(0, content.length - 1);

  return content[randomIndex];
};


