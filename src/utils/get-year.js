import dayjs from 'dayjs';

export const getYear = (date) => dayjs(date).format('YYYY');
