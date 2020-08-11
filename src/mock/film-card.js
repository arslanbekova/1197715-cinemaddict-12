const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFractional = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return lower + Math.random() * (upper - lower);
};

const generateFilmTitle = () => {
  const films = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
  ];

  const randomIndex = getRandomInteger(0, films.length - 1);

  return films[randomIndex];
};

const generateFilmPoster = () => {
  const posters = [
    `/images/posters/made-for-each-other.png`,
    `/images/posters/popeye-meets-sinbad.png`,
    `/images/posters/sagebrush-trail.jpg`,
    `/images/posters/santa-claus-conquers-the-martians.jpg`,
    `/images/posters/the-dance-of-life.jpg`,
    `/images/posters/the-great-flamarion.jpg`,
    `/images/posters/the-man-with-the-golden-arm.jpg`,
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateFilmDescription = () => {
  const filmDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const period = '.';
  let filmDescriptionInStrings = [];

  const splitString = (stringToSplit, separator) => {
    return filmDescriptionInStrings = stringToSplit.split(separator);
  };

  splitString(filmDescription, period);

  const newFilmDescription = filmDescriptionInStrings.splice(getRandomInteger(filmDescriptionInStrings.length)).join(`.`);
  const newFilmDescriptionLength = newFilmDescription.length;

  if (newFilmDescriptionLength > 140) {
    return newFilmDescription.slice (0, 139) + `...`
  };

  return newFilmDescription;
};

const generateFilmRate = () => {
  const rate = getRandomFractional(0, 10);
  return rate.toFixed(1);
};

const generateProductionYear = () => {
  return getRandomInteger(1920, 2000);
};

const generateFilmDuration = () => {
  return getRandomInteger(1, 3) + `h` + ` ` + getRandomInteger(1, 59) + `m`;
};

const generateFilmGenre = () => {
  const genres = [
    `Musical`,
    `Comedy`,
    `Drama`,
    `Adventure`,
    `Detective`,
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

export const generateFilmCard = () => {
  return {
    poster: generateFilmPoster(),
    title: generateFilmTitle(),
    rate: generateFilmRate(),
    productionYear: generateProductionYear(),
    duration: generateFilmDuration(),
    genre: generateFilmGenre(),
    description: generateFilmDescription(),
    commentsCount: getRandomInteger(0, 5),
  };
};
