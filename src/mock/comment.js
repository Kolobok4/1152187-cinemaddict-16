import {getRandomElement} from '../utils/get-random-element';
import {authors, comments, EMOTIONS} from './data';
import {getRandomDate} from '../utils/get-random-date';
import {nanoid} from 'nanoid';


export const generateComment = () => ({
  id: nanoid(),
  author: getRandomElement(authors),
  comment: getRandomElement(comments),
  date: getRandomDate(),
  emotion: getRandomElement(EMOTIONS),
});


