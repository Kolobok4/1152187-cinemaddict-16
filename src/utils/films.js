import dayjs from 'dayjs';

export const getFilmsCount = (films) => ({
  watchList: films.filter((film) => film.userDetails.watchlist).length,
  alreadyWatched: films.filter((film) => film.userDetails.alreadyWatched).length,
  favorite: films.filter((film) => film.userDetails.favorite).length
});

export const getSortedFilms = (films, sortType) => (
  films.sort((current, next) => {
    if (sortType === 'date') {
      return dayjs(next.info.release.date).diff(dayjs(current.info.release.date));
    }

    if (sortType === 'rating') {
      return next.info.filmRating - current.info.filmRating;
    }

    if (sortType === 'comments') {
      return next.comments.length - current.comments.length;
    }

    throw new Error('Invalid sortType');
  })
);
