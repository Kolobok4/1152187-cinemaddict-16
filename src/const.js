
export const FILM_COUNT = 20;
export const FILM_COUNT_PER_STEP = 5;
export const DESCRIPTION_COUNT = 140;
export const closeKeyNameLong = 'Escape';
export const closeKeyNameShort = 'Esc';
export const EXTRA_FILM_COUNT = 2;
export const COMMENTS_COUNT = 80;

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

export const ActionType = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: {type: 'all', name: 'All movies'},
  WATCHLIST: {type: 'watchlist', name: 'Watchlist'},
  HISTORY: {type: 'history', name: 'History'},
  FAVORITES: {type: 'favorites', name: 'Favorites'}
};

export const NoTasksTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now'
};
