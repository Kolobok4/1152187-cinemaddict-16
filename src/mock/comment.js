import {getRandomElement} from '../utils/get-random-element';
import {getRandomInteger} from '../utils/get-random-integer';
import {Comments} from './data';
import {getRandomDate} from '../utils/get-random-date';


const generateOneComment = () => ({
  author: getRandomElement(Comments.AUTHORS),
  date: getRandomDate(),
  comment: getRandomElement(Comments.MESSAGES),
  emotion: getRandomElement(Comments.EMOTIONS),
});

export const generateComments = () => {
  const array = [];
  for (let i = 0; i < getRandomInteger(0, Comments.MAX); i++) {
    array.push(generateOneComment(i));
  }
  return array;
};
