import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatDuration = (minutes) => {
  const time = dayjs.duration(minutes, 'minutes');
  return minutes < 60 ? time.format('m[m]') : time.format('H[h] m[m]');
};
