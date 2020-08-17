import moment from 'moment';
import {getRandomElement} from "../utils.js";
import {getRandomInteger} from "../utils.js";
import {getRandomFractional} from "../utils.js";
import {generateRandomList} from "../utils.js";

const FILM_RATE_MAX = 10;
const AGE_LIMIT_MAX = 18;
const COMMENTS_COUNT_MAX = 5;
const FILM_DESCRIPTION_SENTENCES_MAX = 5;
const FILM_DESCRIPTION_LENGTH_MAX = 140;
const FILM_DESCRIPTION_RENDERED_SIGNS = 139;

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const films = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const posters = [
  `/images/posters/made-for-each-other.png`,
  `/images/posters/popeye-meets-sinbad.png`,
  `/images/posters/sagebrush-trail.jpg`,
  `/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/images/posters/the-dance-of-life.jpg`,
  `/images/posters/the-great-flamarion.jpg`,
  `/images/posters/the-man-with-the-golden-arm.jpg`,
];

const directors = [
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Stanley Kubrick`,
  `Alfred Hitchcock`,
];

const countries = [
  `USA`,
  `United Kingdom`,
  `France`,
  `Russia`,
  `India`,
];

const authors = [
  `Joe`,
  `Phoebe`,
  `Monika`,
  `Rachel`,
  `Chendler`,
  `Ross`,
];

const writers = [
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Robert Towne`,
  `Nora Ephron`,
];

const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Robert De Niro`,
  `Brad Pitt`,
];

const generateFullFilmDescription = () => {
  const filmDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const filmDescriptionInStrings = filmDescription.split(`.`);

  let randomFilmDescriptionInStrings = [];

  for (let i = 0; i < getRandomInteger(FILM_DESCRIPTION_SENTENCES_MAX); i++) {
    randomFilmDescriptionInStrings.push(filmDescriptionInStrings[Math.floor(Math.random() * filmDescriptionInStrings.length)]);
  }

  return randomFilmDescriptionInStrings.join(`.`);
};

const generateFilmDescription = () => {
  const newFilmDescription = generateFullFilmDescription();

  if (newFilmDescription.length > FILM_DESCRIPTION_LENGTH_MAX) {
    return newFilmDescription.slice(FILM_DESCRIPTION_RENDERED_SIGNS) + `...`;
  }

  return newFilmDescription;
};

const generateFilmRate = () => {
  return getRandomFractional(FILM_RATE_MAX).toFixed(1);
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateReleaseDate = () => {
  const releaseDate = generateRandomDate(new Date(1925, 1, 0), new Date());
  return moment(releaseDate).locale(`en`).format(`DD MMMM YYYY`);
};

const generateCommentDate = () => {
  const commentDate = generateRandomDate(new Date(2010, 1, 0), new Date());
  return moment(commentDate).format(`YYYY/MM/DD hh:mm`);
};

const generateFilmDuration = () => {
  return getRandomInteger(1, 3) + `h` + ` ` + getRandomInteger(1, 59) + `m`;
};

const generateFilmGenres = () => {
  const genres = [
    `Musical`,
    `Comedy`,
    `Drama`,
    `Adventure`,
    `Detective`,
  ];

  const shuffledGenres = genres.sort(() => 0.5 - Math.random());

  let randomGenres = [];

  for (let i = 0; i < getRandomInteger(genres.length); i++) {
    randomGenres.push(shuffledGenres[Math.floor(Math.random() * shuffledGenres.length)]);
  }

  return randomGenres;
};

const generateComments = (commentsCount) => {
  const createComment = () => {
    return {
      text: generateFilmDescription(),
      emotion: getRandomElement(emotions),
      author: getRandomElement(authors),
      date: generateCommentDate(),
    };
  };
  return new Array(commentsCount).fill().map(createComment);
};

export const generateFilm = () => {
  return {
    poster: getRandomElement(posters),
    ageLimit: getRandomInteger(AGE_LIMIT_MAX),
    title: getRandomElement(films),
    titleOrigin: getRandomElement(films),
    rate: generateFilmRate(),
    productionYear: getRandomInteger(1920, 2000),
    director: getRandomElement(directors),
    writers: generateRandomList(writers),
    actors: generateRandomList(actors),
    releaseDate: generateReleaseDate(),
    duration: generateFilmDuration(),
    country: getRandomElement(countries),
    genres: generateFilmGenres(),
    description: generateFilmDescription(),
    fullDescription: generateFullFilmDescription(),
    comments: generateComments(getRandomInteger(COMMENTS_COUNT_MAX)),
    isAtWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
  };
};
