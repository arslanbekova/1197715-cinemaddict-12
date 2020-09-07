import {render, remove} from "../utils/render.js";
import {isEscEvent} from "../utils/general.js";
import FilmCard from "../view/film-card.js";
import FilmPopup from "../view/film-popup.js";

export default class FilmPopupPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._onPopupCloseBtnEscPress = this._onPopupCloseBtnEscPress.bind(this);
    this._closeFilmPopup = this._closeFilmPopup.bind(this);
    this._openFilmPopup = this._openFilmPopup.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmPopupComponent = new FilmPopup(this._film);

    this._filmCardComponent.setOnFilmCardElementClick(this._openFilmPopup);
    render(this._filmsContainer, this._filmCardComponent);
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
}
