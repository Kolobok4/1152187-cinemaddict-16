import {getRandomElement} from '../utils/get-random-element';
import {AUTHORS, COMMENTS, EMOTIONS} from './data';
import {getRandomDate} from '../utils/get-random-date';
import {nanoid} from 'nanoid';


export const generateComment = () => ({
  id: nanoid(),
  author: getRandomElement(AUTHORS),
  comment: getRandomElement(COMMENTS),
  date: getRandomDate(),
  emotion: getRandomElement(EMOTIONS),
});


