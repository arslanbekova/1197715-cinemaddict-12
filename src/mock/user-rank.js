export const generateUserRank = (films) => {
  const [
    ,
    history,
  ] = films;

  const watchedFilmsCount = history.count;

  const watchedFilmsRate = {
    NO_RATE: 0,
    NOVICE_MIN: 1,
    NOVICE_MAX: 10,
    FAN_MIN: 11,
    FAN_MAX: 20
  };

  if (watchedFilmsCount === watchedFilmsRate.NO_RATE) {
    return ``;
  } else if (watchedFilmsCount >= watchedFilmsRate.NOVICE_MIN && watchedFilmsCount <= watchedFilmsRate.NOVICE_MAX) {
    return `novice`;
  } else if (watchedFilmsCount >= watchedFilmsRate.FAN_MIN && watchedFilmsCount <= watchedFilmsRate.FAN_MAX) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};
