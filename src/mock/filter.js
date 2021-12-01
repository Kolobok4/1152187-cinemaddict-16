const filterMap = {
  watchlist: (films) => films
    .filter((film) => film.isWatchList).length,
  history: (films) => films
    .filter((film) => film.isAlreadyWatched).length,
  favorites: (films) => films
    .filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
