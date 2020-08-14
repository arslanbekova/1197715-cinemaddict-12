const dateFormat = require(`dateformat`);

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

const generateFullFilmDescription = () => {
  const filmDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const period = '.';
  let filmDescriptionInStrings = [];

  const splitString = (stringToSplit, separator) => {
    return filmDescriptionInStrings = stringToSplit.split(separator);
  };

  splitString(filmDescription, period);

  return filmDescriptionInStrings.splice(getRandomInteger(filmDescriptionInStrings.length)).join(`.`);
};

const generateFilmDescription = () => {
  const newFilmDescription = generateFullFilmDescription();
  const newFilmDescriptionLength = newFilmDescription.length;

  if (newFilmDescriptionLength > 140) {
    return newFilmDescription.slice(0, 139) + `...`
  };

  return newFilmDescription;
};

const generateFilmRate = () => {
  const rate = getRandomFractional(0, 10);
  return rate.toFixed(1);
};

const generateFilmDirector = () => {
  const directors = [
    `Quentin Tarantino`,
    `Christopher Nolan`,
    `Steven Spielberg`,
    `Martin Scorsese`,
    `Stanley Kubrick`,
    `Alfred Hitchcock`,
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateFilmWriters = () => {
  const writers = [
    `Heinz Herald`,
    `Richard Weil`,
    `Billy Wilder`,
    `Robert Towne`,
    `Nora Ephron`,
  ];

  const randomArrayOfWriters = writers.slice(getRandomInteger(0, writers.length - 2));
  return randomArrayOfWriters.join(`, `);
};

const generateFilmActors = () => {
  const actors = [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`,
    `Morgan Freeman`,
    `Leonardo DiCaprio`,
    `Robert De Niro`,
    `Brad Pitt`,
  ];

  const randomArrayOfActors = actors.slice(getRandomInteger(0, actors.length - 2));
  return randomArrayOfActors.join(`, `);
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const generateReleaseDate = () => {
  const releaseDate = generateRandomDate(new Date(1925, 1, 0), new Date()).toLocaleDateString('en');
  return dateFormat(releaseDate, 'dd mmmm yyyy');
}

const generateCommentDate = () => {
  const commentDate = generateRandomDate(new Date(2010, 1, 0), new Date());
  return dateFormat(commentDate, 'yyyy/mm/dd hh:mm');
};

const generateProductionYear = () => {
  return getRandomInteger(1920, 2000);
};

const generateFilmDuration = () => {
  return getRandomInteger(1, 3) + `h` + ` ` + getRandomInteger(1, 59) + `m`;
};

const generateFilmCountry = () => {
  const countries = [
    `USA`,
    `United Kingdom`,
    `France`,
    `Russia`,
    `India`,
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateFilmGenres = () => {
  const genres = [
    `Musical`,
    `Comedy`,
    `Drama`,
    `Adventure`,
    `Detective`,
  ];

  const randomArrayOfGenres = genres.slice(getRandomInteger(0, genres.length - 1));
  return randomArrayOfGenres;
};

const generateCommentEmotion = () => {
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`,
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateCommentAuthor = () => {
  const authors = [
    `Joe`,
    `Phoebe`,
    `Monika`,
    `Rachel`,
    `Chendler`,
    `Ross`,
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateComments = (commentsCount) => {
  const createComment = () => {
    return {
      text: generateFilmDescription(),
      emotion: generateCommentEmotion(),
      author: generateCommentAuthor(),
      date: generateCommentDate(),
    }
  }
  const comments = new Array(commentsCount).fill().map(createComment);
  return comments;
};

export const generateFilm = () => {
  const genres = generateFilmGenres();
  const commentsCount = getRandomInteger(0, 500);
  return {
    poster: generateFilmPoster(),
    ageLimit: getRandomInteger(0, 18),
    title: generateFilmTitle(),
    titleOrigin: generateFilmTitle(),
    rate: generateFilmRate(),
    productionYear: generateProductionYear(),
    director: generateFilmDirector(),
    writers: generateFilmWriters(),
    actors: generateFilmActors(),
    releaseDate: generateReleaseDate(),
    duration: generateFilmDuration(),
    country: generateFilmCountry(),
    getGenre: function () {
      const randomIndex = getRandomInteger(0, genres.length - 1);
      return genres[randomIndex];
    },
    description: generateFilmDescription(),
    fullDescription: generateFullFilmDescription(),
    commentsCount,
    comments: generateComments(commentsCount),
    isAtWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
  };
};
