// import Abstract from "./abstract.js";
import Smart from "./smart.js";

const createFilmCardTemplate = (film) => {
  const {
    poster,
    title,
    rate,
    productionYear,
    duration,
    genres,
    description,
    comments
  } = film;
  const [firstGenre] = genres;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${productionYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${firstGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends Smart {
  constructor(film) {
    super();
    this._film = film;
    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);
    this._onControlWatchlistClick = this._onControlWatchlistClick.bind(this);
    this._onControlWatchedClick = this._onControlWatchedClick.bind(this);
    this._onControlFavoriteClick = this._onControlFavoriteClick.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._onFilmCardElementClick);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._onFilmCardElementClick);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._onFilmCardElementClick);
  }

  _onFilmCardElementClick(evt) {
    evt.preventDefault();
    this._callback.onFilmCardElementClick();
  }

  setOnFilmCardElementClick(callback) {
    this._callback.onFilmCardElementClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._onFilmCardElementClick);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._onFilmCardElementClick);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._onFilmCardElementClick);
  }

  _onControlWatchlistClick(evt) {
    evt.preventDefault();
    this.updateData({
      isAtWatchlist: !this._film.isAtWatchlist
    });
    this._callback.onControlWatchlistClick();
  }

  setOnControlWatchlistClick(callback) {
    this._callback.onControlWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onControlWatchlistClick);
  }

  _onControlWatchedClick(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._film.isWatched
    });
    this._callback.onControlWatchedClick();
  }

  setOnControlWatchedClick(callback) {
    this._callback.onControlWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onControlWatchedClick);
  }

  _onControlFavoriteClick(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._film.isFavorite
    });
    this._callback.onControlFavoriteClick();
  }

  setOnControlFavoriteClick(callback) {
    this._callback.onControlFavoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onControlFavoriteClick);
  }
}
