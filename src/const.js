
export const FILM_COUNT = 20;
export const FILM_COUNT_PER_STEP = 5;
export const DESCRIPTION_COUNT = 140;
export const closeKeyNameLong = 'Escape';
export const closeKeyNameShort = 'Esc';
export const keyNameEnter = 'Enter';
export const EXTRA_FILM_COUNT = 2;
export const COMMENTS_COUNT = 80;
export const BAR_HEIGHT = 50;
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
export const API_URL = 'https://16.ecmascript.pages.academy/cinemaddict';
export const API_AUTHORIZATION = 'Basic jkl465fsdflkc';

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
  INIT: 'INIT'
};

export const FilterType = {
  ALL: {type: 'all', name: 'All movies'},
  WATCHLIST: {type: 'watchlist', name: 'Watchlist'},
  HISTORY: {type: 'history', name: 'History'},
  FAVORITES: {type: 'favorites', name: 'Favorites'}
};

export const NoTasksTextType = {
  [FilterType.ALL.type]: 'There are no movies in our database',
  [FilterType.WATCHLIST.type]: 'There are no movies to watch now',
  [FilterType.HISTORY.type]: 'There are no watched movies now',
  [FilterType.FAVORITES.type]: 'There are no favorite movies now'
};

export const ScreenType = {
  FILMS: 'films',
  STATS: 'stats'
};

export const StatsFilterType = {
  ALL: {type: 'all-time', name: 'All time'},
  TODAY: {type: 'today', name: 'Today'},
  WEEK: {type: 'week', name: 'Week'},
  MONTH: {type: 'month', name: 'Month'},
  YEAR: {type: 'year', name: 'Year'}
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING'
};
