import {createElement} from "../utils.js";

const createNoFilmsTenplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class noFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsTenplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
