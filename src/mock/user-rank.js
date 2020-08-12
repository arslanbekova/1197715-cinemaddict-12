const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateUserRank = () => {
  const watchedFilmsCount = getRandomInteger(0, 100);
  if (watchedFilmsCount === 0) {
    return ``
  } else if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    return `novice`
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return `fan`
  } else {
    return `movie buff`
  }
};
