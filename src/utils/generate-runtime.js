import {getRandomInteger} from './get-random-integer';
import dayjs from 'dayjs';
import {Runtime} from '../mock/data';
import duration from 'dayjs/plugin/duration.js';

export const generateRuntime = () => {
  dayjs.extend(duration);

  let formatString = 'mm[M]';

  const minutesDuration = getRandomInteger(Runtime.MIN, Runtime.MAX);

  if (minutesDuration >= Runtime.MINUTES_IN_HOUR) {
    formatString = 'H[h] mm[m]';
  }

  return dayjs.duration(minutesDuration, 'm').format(formatString);
};
