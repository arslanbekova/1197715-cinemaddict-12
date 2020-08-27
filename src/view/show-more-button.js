import Abstract from "./abstract.js";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends Abstract {
  constructor() {
    super();
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
  }
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _onShowMoreButtonClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setOnShowMoreButtonClick(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._onShowMoreButtonClick);
  }
}
