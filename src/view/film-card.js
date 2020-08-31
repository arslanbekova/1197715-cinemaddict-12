import Abstract from "./abstract.js";

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

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
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
}
