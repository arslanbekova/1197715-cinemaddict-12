export const generateUserRank = (films) => {
  const [
    ,
    history,
  ] = films;
  const watchedFilmsCount = history.count;
  if (watchedFilmsCount === 0) {
    return ``;
  } else if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    return `novice`;
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};
