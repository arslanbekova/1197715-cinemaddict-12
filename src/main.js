import UserRank from "./view/user-rank.js";
import SiteMenu from "./view/site-menu.js";
import SortList from "./view/sort-list.js";
import ContentSection from "./view/content-section.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more-button.js";
import FooterStatistic from "./view/footer-statistic.js";
import FilmPopup from "./view/film-popup.js";
import noFilms from "./view/no-films.js"
import {render, remove} from "./utils/render.js";
import {isEscEvent} from "./utils/general.js";
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

render(siteHeaderElement, new UserRank(generateUserRank(filters)));
render(siteMainElement, new SiteMenu(filters));
render(siteMainElement, new SortList());
render(siteMainElement, new ContentSection());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsCardsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCard(film);
  const filmPopupComponent = new FilmPopup(film);

  const onPopupCloseBtnEscPress = (evt) => {
    isEscEvent(evt, popupClose);
  };

  const popupOpen = () => {
    render(container, filmPopupComponent);
    document.addEventListener(`keydown`, onPopupCloseBtnEscPress);
    filmPopupComponent.setOnPopupCloseBtnClick(popupClose);
  };

  const popupClose = () => {
    remove(filmPopupComponent);
    document.removeEventListener(`keydown`, onPopupCloseBtnEscPress);
  }

  filmCardComponent.setOnFilmCardElementClick(popupOpen);
  render(container, filmCardComponent);
};

const extraFilmsListElements = filmsElement.querySelectorAll(`.films-list--extra`);
const [topRatedFilmsListElement, mostCommentedFilmsListElement] = extraFilmsListElements;
const topRatedFilmsCardsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsCardsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

if (films.length === 0) {
  allFilmsCardsContainerElement.remove();
  extraFilmsListElements.forEach(element => element.remove());
  render(allFilmsListElement, new noFilms());
} else {
  for (let film of films.slice(0, MAX_NUMBER_ALL_FILMS_RENDERED_CARDS)) {
    renderFilmCard(allFilmsCardsContainerElement, film);
  }
};

if (films.length > ALL_FILMS_RENDERED_CARDS_PER_STEP) {
  let renderedFilms = ALL_FILMS_RENDERED_CARDS_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton()
  render(allFilmsListElement, showMoreButtonComponent);

  const showMoreFilms = () => {
    films
      .slice(renderedFilms, renderedFilms + ALL_FILMS_RENDERED_CARDS_PER_STEP)
      .forEach((film) => renderFilmCard(allFilmsCardsContainerElement, film));

    renderedFilms += ALL_FILMS_RENDERED_CARDS_PER_STEP;

    if (renderedFilms >= films.length) {
      remove(showMoreButtonComponent);
    }
  }

  showMoreButtonComponent.setOnShowMoreButtonClick(showMoreFilms)
};

for (let film of films.slice(0, MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS)) {
  renderFilmCard(topRatedFilmsCardsContainerElement, film);
  renderFilmCard(mostCommentedFilmsCardsContainerElement, film);
};

const [, watched] = filters;
render(siteFooterElement, new FooterStatistic(watched.count));
