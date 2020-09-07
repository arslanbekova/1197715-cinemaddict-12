import Abstract from "./abstract.js";
import {SortType} from "../utils/consts.js";

const createSortListTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATE}">Sort by rating</a></li>
    </ul>`
  );
};
export default class SortList extends Abstract {
  constructor() {
    super();

    this._onSortTypeElementClick = this._onSortTypeElementClick.bind(this);
  }

  getTemplate() {
    return createSortListTemplate();
  }

  _addActiveClass(target) {
    const activeButton = this.getElement().querySelector(`.sort__button--active`);
    activeButton.classList.remove(`sort__button--active`);
    target.classList.add(`sort__button--active`);
  }

  _onSortTypeElementClick(evt) {
    if (evt.target.classList.contains(!`sort__button`)) {
      return;
    }

    evt.preventDefault();
    this._addActiveClass(evt.target);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeElementClick(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeElementClick);
  }
}
