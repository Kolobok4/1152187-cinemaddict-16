import dayjs from 'dayjs';

export const formatReleaseYear = (date) => dayjs(date).format('YYYY');
