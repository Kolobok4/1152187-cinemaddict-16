import {getRandomInteger} from './get-random-integer';
import dayjs from 'dayjs';

export const getRandomDate = (minDateGap, maxDateGap) => {
  const dateGap = getRandomInteger(-minDateGap, maxDateGap);

  return dayjs().add(dateGap, 'year').toDate();
};
