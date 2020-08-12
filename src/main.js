import {createUserRankTemplate} from "./view/user-rank.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortListTemplate} from "./view/sort.js";
import {createContentSectionTemplate} from "./view/content-section.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {render} from "./utils.js";
import {generateFilm} from "./mock/film.js";
import {generateUserRank} from "./mock/user-rank.js";
import {generateFooterStatistic} from "./mock/footer-statistic.js";
import {generateSiteMenuFilters} from "./mock/site-menu.js";

const NUMBER_ALL_FILMS_RENDERED_CARDS = 20;
const MAX_NUMBER_ALL_FILMS_RENDERED_CARDS = 5;
const MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS = 2;

const films = new Array(NUMBER_ALL_FILMS_RENDERED_CARDS).fill().map(generateFilm);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserRankTemplate(generateUserRank));
render(siteMainElement, createSiteMenuTemplate(generateSiteMenuFilters));
render(siteMainElement, createSortListTemplate());
render(siteMainElement, createContentSectionTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsCardsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

for (let film of films) {
  if (films.indexOf(film) >= MAX_NUMBER_ALL_FILMS_RENDERED_CARDS) break;
  render(allFilmsCardsContainerElement, createFilmCardTemplate(film));
};

render(allFilmsListElement, createLoadMoreButtonTemplate());

const extraFilmsListElements = filmsElement.querySelectorAll(`.films-list--extra`);
const [topRatedFilmsListElement, mostCommentedFilmsListElement] = extraFilmsListElements;
const topRatedFilmsCardsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsCardsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

// Array(MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS).fill(``).forEach(() => {
//   render(topRatedFilmsCardsContainerElement, createFilmCardTemplate());
//   render(mostCommentedFilmsCardsContainerElement, createFilmCardTemplate());
// });

render(siteFooterElement, createFooterStatisticTemplate(generateFooterStatistic))

render(siteFooterElement, createFilmPopupTemplate(films[0]), `afterend`);
