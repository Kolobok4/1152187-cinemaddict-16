import {getRandomElement} from '../utils/get-random-element';
import {authors, comments, EMOTIONS} from './data';
import {getRandomDate} from '../utils/get-random-date';

let index = 1;

export const generateComment = () => {
  const commentData = {
    id: index.toString(),
    author: getRandomElement(authors),
    comment: getRandomElement(comments),
    date: getRandomDate(),
    emotion: getRandomElement(EMOTIONS),
  };

  index++;
  return commentData;
};


