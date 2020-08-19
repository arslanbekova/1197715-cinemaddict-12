const filmToFilterMap = {
  watchlist: (films) => films
    .filter((film) => !film.isAtWatchlist).length,
  history: (films) => films
    .filter((film) => !film.isWatched).length,
  favorites: (films) => films
    .filter((film) => !film.isFavorite).length,
};

export const generateSiteMenuFilters = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
