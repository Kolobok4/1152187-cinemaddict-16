import {getRandomInteger} from './get-random-integer';
import dayjs from 'dayjs';
import {ReleaseYear} from '../mock/data';

export const generateReleaseDate = () => {
  const currentYear = dayjs().year();

  const maxYearsGap = currentYear - ReleaseYear.MIN;
  const yearsGap = getRandomInteger(0, maxYearsGap);
  const maxDaysGap = 30;
  const daysGap = getRandomInteger(0, maxDaysGap);

  return dayjs().add(-yearsGap, 'year').add(daysGap, 'day').format('DD MMMM YYYY');
};
