import dayjs from 'dayjs';

export const getTimeFromNow = (date) => dayjs(date).fromNow();
