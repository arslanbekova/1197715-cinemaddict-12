const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateSiteMenuFilters = () => {
  return {
    watchlist: getRandomInteger(1, 20),
    history: getRandomInteger(1, 15),
    favorites: getRandomInteger(1, 10),
  }
};
