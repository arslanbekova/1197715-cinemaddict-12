import {render, remove, replace} from "../utils/render.js";
import {isEscEvent} from "../utils/general.js";
import FilmCard from "../view/film-card.js";
import FilmPopup from "../view/film-popup.js";

export default class FilmPopupPresenter {
  constructor(filmsContainer, changeData) {
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._onPopupCloseBtnEscPress = this._onPopupCloseBtnEscPress.bind(this);
    this._closeFilmPopup = this._closeFilmPopup.bind(this);
    this._openFilmPopup = this._openFilmPopup.bind(this);

    this._onControlWatchlistClick = this._onControlWatchlistClick.bind(this);
    this._onControlWatchedClick = this._onControlWatchedClick.bind(this);
    this._onControlFavoriteClick = this._onControlFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCard(this._film);
    this._filmPopupComponent = new FilmPopup(this._film);

    this._filmCardComponent.setOnFilmCardElementClick(this._openFilmPopup);

    this._filmCardComponent.setOnControlWatchlistClick(this._onControlWatchlistClick);
    this._filmCardComponent.setOnControlWatchedClick(this._onControlWatchedClick);
    this._filmCardComponent.setOnControlFavoriteClick(this._onControlFavoriteClick);

    this._filmPopupComponent.setOnControlWatchlistClick(this._onControlWatchlistClick);
    this._filmPopupComponent.setOnControlWatchedClick(this._onControlWatchedClick);
    this._filmPopupComponent.setOnControlFavoriteClick(this._onControlFavoriteClick);

    if (prevFilmCardComponent === null || prevFilmPopupComponent === null) {
      render(this._filmsContainer, this._filmCardComponent);
      return
    };

    if (this._filmsContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmsContainer.contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmPopupComponent);
  }

  _closeFilmPopup() {
    remove(this._filmPopupComponent);
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onPopupCloseBtnEscPress);
  }

  _onPopupCloseBtnEscPress(evt) {
    isEscEvent(evt, this._closeFilmPopup);
  }

  _openFilmPopup() {
    render(this._filmsContainer, this._filmPopupComponent);
    document.querySelector(`body`).classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._onPopupCloseBtnEscPress);
    this._filmPopupComponent.setOnPopupCloseBtnClick(this._closeFilmPopup);
  }

  _onControlWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {isAtWatchlist: !this._film.isAtWatchlist}
        )
    );
  }
  _onControlWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {isWatched: !this._film.isWatched}
        )
    );
  }
  _onControlFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {isFavorite: !this._film.isFavorite}
        )
    );
  }
}
