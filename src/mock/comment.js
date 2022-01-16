import {getRandomElement} from '../utils/get-random-element';
import {AUTHORS, COMMENTS, EMOTIONS} from './data';
import {nanoid} from 'nanoid';
import {getRandomDate} from '../utils/get-random-date';


 const generateComment = () => ({
  id: nanoid(),
  author: getRandomElement(AUTHORS),
  comment: getRandomElement(COMMENTS),
  date: getRandomDate(2, 1),
  emotion: getRandomElement(EMOTIONS),
});


