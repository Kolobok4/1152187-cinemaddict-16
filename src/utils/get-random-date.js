import {getRandomInteger} from './get-random-integer';
import dayjs from 'dayjs';


export const getRandomDate = () => {
  const maxDaysGap = 360;

  const daysGap = getRandomInteger(0, maxDaysGap);

  const formatString = 'YYYY/MM/D HH:mm';

  return dayjs().add(-daysGap, 'day').format(formatString);
};
