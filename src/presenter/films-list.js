import SortList from "../view/sort-list.js";
import ContentSection from "../view/content-section.js";
import TopRatedFilms from "../view/top-rated-films.js";
import MostCommentedFilms from "../view/most-commented-films.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilms from "../view/no-films.js";
import FilmPopupPresenter from "./film-popup-presenter.js";

import {render, remove} from "../utils/render.js";
import {
  MAX_NUMBER_ALL_FILMS_RENDERED_CARDS,
  ALL_FILMS_RENDERED_CARDS_PER_STEP,
  MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS,
  SortType,
} from "../utils/consts.js";

export default class FilmsList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._sortListComponent = new SortList();
    this._contentSectionComponent = new ContentSection();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostCommentedFilmsComponent = new MostCommentedFilms();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._noFilmsComponent = new NoFilms();

    this._allFilmsContainerElement = this._contentSectionComponent.getElement().querySelector(`.films-list__container`);

    this._clickSortTypeElement = this._clickSortTypeElement.bind(this);

    this._currentSortType = SortType.DEFAULT;
  }

  init(films) {
    this._films = films;
    this._sourcedFilms = films.slice();

    this._renderFilmsList(this._films);
  }

  _renderSortList() {
    render(this._filmsContainer, this._sortListComponent);
    this._sortListComponent.setOnSortTypeElementClick(this._clickSortTypeElement);
  }

  _clickSortTypeElement(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearAllFilmsList();
    this._renderAllFilmsList(this._films);
    this._renderShowMoreButton(this._films);
  }

  _sortFilms(sortType) {
    this._currentSortType = sortType;

    switch (sortType) {
      case SortType.DATE:
        this._films.sort((a, b) => b.productionYear - a.productionYear);
        break;
      case SortType.RATE:
        this._films.sort((a, b) => b.rate - a.rate);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }
  }

  _renderContentSection() {
    render(this._filmsContainer, this._contentSectionComponent);
  }

  _renderFilmCard(film, container) {
    const filmPopup = new FilmPopupPresenter(container);
    filmPopup.init(film);
  }

  _renderShowMoreButton(films) {
    if (films.length > ALL_FILMS_RENDERED_CARDS_PER_STEP) {
      let renderedFilms = ALL_FILMS_RENDERED_CARDS_PER_STEP;
      const allFilmsListElement = this._contentSectionComponent.getElement().querySelector(`.films-list`);

      render(allFilmsListElement, this._showMoreButtonComponent);

      const showMoreFilms = () => {
        films
          .slice(renderedFilms, renderedFilms + ALL_FILMS_RENDERED_CARDS_PER_STEP)
          .forEach((film) => this._renderFilmCard(film, this._allFilmsContainerElement));

        renderedFilms += ALL_FILMS_RENDERED_CARDS_PER_STEP;

        if (renderedFilms >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      };

      this._showMoreButtonComponent.setOnShowMoreButtonClick(showMoreFilms);
    }
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmsComponent);
  }

  _renderAllFilmsList(films) {
    for (let film of films.slice(0, MAX_NUMBER_ALL_FILMS_RENDERED_CARDS)) {
      this._renderFilmCard(film, this._allFilmsContainerElement);
    }
  }

  _clearAllFilmsList() {
    this._allFilmsContainerElement.innerHTML = ``;
  }

  _renderExtraFilmsLists(films) {
    const contentSectionElement = this._contentSectionComponent.getElement();
    const topRatedFilmsContainerElement = this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);
    const mostCommentedFilmsContainerElement = this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

    render(contentSectionElement, this._topRatedFilmsComponent);
    render(contentSectionElement, this._mostCommentedFilmsComponent);

    for (let film of films.slice(0, MAX_NUMBER_EXTRA_FILMS_RENDERED_CARDS)) {
      this._renderFilmCard(film, topRatedFilmsContainerElement);
      this._renderFilmCard(film, mostCommentedFilmsContainerElement);
    }
  }

  _renderFilmsList(films) {
    this._renderSortList();
    if (films.length === 0) {
      this._renderNoFilms();
    } else {
      this._renderContentSection();
      this._renderAllFilmsList(films);
      this._renderShowMoreButton(films);
      this._renderExtraFilmsLists(films);
    }
  }
}
