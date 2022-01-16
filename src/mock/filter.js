import {getFilmsCount} from '../utils/films';

const filmToFilterMap = {
  watchlist: (films) => getFilmsCount(films).watchList,
  history: (films) => getFilmsCount(films).alreadyWatched,
  favorites: (films) => getFilmsCount(films).favorite
};

const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, filmsCount]) => ({
    name: filterName,
    count: filmsCount(films)
  })
);

