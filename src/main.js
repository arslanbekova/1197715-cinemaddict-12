import UserRank from "./view/user-rank.js";
import SiteMenu from "./view/site-menu.js";
import SortList from "./view/sort.js";
import ContentSection from "./view/content-section.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more-button.js";
import FooterStatistic from "./view/footer-statistic.js";
import FilmPopup from "./view/film-popup.js";
import {renderTemplate, renderElement} from "./utils.js";
import {generateFilm} from "./mock/film.js";
import {generateUserRank} from "./mock/user-rank.js";
import {generateSiteMenuFilters} from "./mock/site-menu.js";

const NUMBER_ALL_FILMS_RENDERED_CARDS = 20;
const MAX_NUMBER_ALL_FILMS_RENDERED_CARDS = 5;
const ALL_FILMS_RENDERED_CARDS_PER_STEP = 5;
const MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS = 2;

const films = new Array(NUMBER_ALL_FILMS_RENDERED_CARDS).fill().map(generateFilm);
const filters = generateSiteMenuFilters(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

renderElement(siteHeaderElement, new UserRank(generateUserRank(filters)).getElement());
renderElement(siteMainElement, new SiteMenu(filters).getElement());
renderElement(siteMainElement, new SortList().getElement());
renderElement(siteMainElement, new ContentSection().getElement());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsCardsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

for (let film of films) {
  if (films.indexOf(film) >= MAX_NUMBER_ALL_FILMS_RENDERED_CARDS) break;
  renderElement(allFilmsCardsContainerElement, new FilmCard(film).getElement());
};

if (films.length > ALL_FILMS_RENDERED_CARDS_PER_STEP) {
  let renderedFilms = ALL_FILMS_RENDERED_CARDS_PER_STEP;

  renderElement(allFilmsListElement, new ShowMoreButton().getElement());

  const showMoreButton = allFilmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilms, renderedFilms + ALL_FILMS_RENDERED_CARDS_PER_STEP)
      .forEach((film) => renderTemplate(allFilmsCardsContainerElement, createFilmCardTemplate(film)));

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
  renderElement(topRatedFilmsCardsContainerElement, new FilmCard(film).getElement());
  renderElement(mostCommentedFilmsCardsContainerElement, new FilmCard(film).getElement());
};

const [, watched] = filters;
renderElement(siteFooterElement, new FooterStatistic(watched.count).getElement());

renderElement(siteFooterElement, new FilmPopup(films[0]).getElement(), `afterend`);
