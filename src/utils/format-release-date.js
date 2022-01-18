import dayjs from 'dayjs';

export const formatReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');
