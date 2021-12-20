import {getRandomInteger} from './get-random-integer';
import {COMMENTS_COUNT} from '../const';

export const Comment = {
  MIN_COUNT: 0,
  MAX_COUNT: 5
};

export const generateCommentsId = () => {
  const commentsId = [];
  const randomCount = getRandomInteger(Comment.MIN_COUNT, Comment.MAX_COUNT);

  for (let i = 0; i < randomCount; i++) {
    commentsId.push(getRandomInteger(1, COMMENTS_COUNT).toString());
  }

  return commentsId;
};
