import dayjs from 'dayjs';

export const getDuration = (minutes) => {
  const time = dayjs.duration(minutes, 'minutes');
  return {
    hours: time.format('H'),
    minutes: time.format('m')
  };
};
