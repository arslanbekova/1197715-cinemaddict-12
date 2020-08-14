import {createUserRankTemplate} from "./view/user-rank.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortListTemplate} from "./view/sort.js";
import {createContentSectionTemplate} from "./view/content-section.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {render} from "./utils.js";
import {generateFilm} from "./mock/film.js";
import {generateUserRank} from "./mock/user-rank.js";
import {generateFooterStatistic} from "./mock/footer-statistic.js";
import {generateSiteMenuFilters} from "./mock/site-menu.js";

export const dateFormat = require(`dateformat`);

const NUMBER_ALL_FILMS_RENDERED_CARDS = 20;
const MAX_NUMBER_ALL_FILMS_RENDERED_CARDS = 5;
const ALL_FILMS_RENDERED_CARDS_PER_STEP = 5;
const MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS = 2;

const films = new Array(NUMBER_ALL_FILMS_RENDERED_CARDS).fill().map(generateFilm);
const filters = generateSiteMenuFilters(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserRankTemplate(generateUserRank(filters)));
render(siteMainElement, createSiteMenuTemplate(filters));
render(siteMainElement, createSortListTemplate());
render(siteMainElement, createContentSectionTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsCardsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

for (let film of films) {
  if (films.indexOf(film) >= MAX_NUMBER_ALL_FILMS_RENDERED_CARDS) break;
  render(allFilmsCardsContainerElement, createFilmCardTemplate(film));
};

if (films.length > ALL_FILMS_RENDERED_CARDS_PER_STEP) {
  let renderedFilms = ALL_FILMS_RENDERED_CARDS_PER_STEP;

  render(allFilmsListElement, createShowMoreButtonTemplate());

  const showMoreButton = allFilmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilms, renderedFilms + ALL_FILMS_RENDERED_CARDS_PER_STEP)
      .forEach((film) => render(allFilmsCardsContainerElement, createFilmCardTemplate(film)));

    renderedFilms += ALL_FILMS_RENDERED_CARDS_PER_STEP;

    if (renderedFilms >= films.length) {
      showMoreButton.remove();
    }
  });
};

const extraFilmsListElements = filmsElement.querySelectorAll(`.films-list--extra`);
const [topRatedFilmsListElement, mostCommentedFilmsListElement] = extraFilmsListElements;
const topRatedFilmsCardsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsCardsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

for (let film of films) {
  if (films.indexOf(film) >= MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS) break;
  render(topRatedFilmsCardsContainerElement, createFilmCardTemplate(film));
  render(mostCommentedFilmsCardsContainerElement, createFilmCardTemplate(film));
};

render(siteFooterElement, createFooterStatisticTemplate(generateFooterStatistic))

render(siteFooterElement, createFilmPopupTemplate(films[0]), `afterend`);
