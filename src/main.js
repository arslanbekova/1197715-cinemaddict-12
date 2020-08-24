import UserRank from "./view/user-rank.js";
import SiteMenu from "./view/site-menu.js";
import SortList from "./view/sort-list.js";
import ContentSection from "./view/content-section.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more-button.js";
import FooterStatistic from "./view/footer-statistic.js";
import FilmPopup from "./view/film-popup.js";
import noFilms from "./view/no-films.js"
import {render, isEscEvent} from "./utils.js";
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

render(siteHeaderElement, new UserRank(generateUserRank(filters)).getElement());
render(siteMainElement, new SiteMenu(filters).getElement());
render(siteMainElement, new SortList().getElement());
render(siteMainElement, new ContentSection().getElement());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsCardsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCard(film);
  const filmCardTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  const filmPopupComponent = new FilmPopup(film);
  const popupCloseBtn = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  const onFilmCardElementClick = () => {
    container.appendChild(filmPopupComponent.getElement());
  };

  const popupClose = () => {
    container.removeChild(filmPopupComponent.getElement());
  }

  const onPopupCloseBtnClick = () => {
    popupClose();
  };

  const onPopupCloseBtnEscPress = (evt) => {
    isEscEvent(evt, popupClose);
  };

  filmCardTitle.addEventListener(`click`, onFilmCardElementClick);
  filmCardPoster.addEventListener(`click`, onFilmCardElementClick);
  filmCardComments.addEventListener(`click`, onFilmCardElementClick);
  popupCloseBtn.addEventListener(`click`, onPopupCloseBtnClick);
  document.addEventListener(`keydown`, onPopupCloseBtnEscPress);

  render(container, filmCardComponent.getElement());
};

const extraFilmsListElements = filmsElement.querySelectorAll(`.films-list--extra`);
const [topRatedFilmsListElement, mostCommentedFilmsListElement] = extraFilmsListElements;
const topRatedFilmsCardsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsCardsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

if (films.length === 0) {
  allFilmsCardsContainerElement.remove();
  extraFilmsListElements.forEach(element => element.remove());
  render(allFilmsListElement, new noFilms().getElement());
} else {
  for (let film of films.slice(0, MAX_NUMBER_ALL_FILMS_RENDERED_CARDS)) {
    renderFilmCard(allFilmsCardsContainerElement, film);
  }
};

if (films.length > ALL_FILMS_RENDERED_CARDS_PER_STEP) {
  let renderedFilms = ALL_FILMS_RENDERED_CARDS_PER_STEP;

  render(allFilmsListElement, new ShowMoreButton().getElement());

  const showMoreButton = allFilmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilms, renderedFilms + ALL_FILMS_RENDERED_CARDS_PER_STEP)
      .forEach((film) => renderFilmCard(allFilmsCardsContainerElement, film));

    renderedFilms += ALL_FILMS_RENDERED_CARDS_PER_STEP;

    if (renderedFilms >= films.length) {
      showMoreButton.remove();
    }
  });
};

for (let film of films.slice(0, MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS)) {
  renderFilmCard(topRatedFilmsCardsContainerElement, film);
  renderFilmCard(mostCommentedFilmsCardsContainerElement, film);
};

const [, watched] = filters;
render(siteFooterElement, new FooterStatistic(watched.count).getElement());
