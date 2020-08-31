import Abstract from "./abstract.js";

const createSiteMenuTemplate = (filters) => {
  const [
    watchlist,
    history,
    favorites,
  ] = filters;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.count}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.count}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.count}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
export default class SiteMenu extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
