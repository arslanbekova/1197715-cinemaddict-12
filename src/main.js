import UserRank from "./view/user-rank.js";
import SiteMenu from "./view/site-menu.js";
import FilmsList from "./presenter/films-list.js"
import FooterStatistic from "./view/footer-statistic.js";

import {render} from "./utils/render.js";
import {NUMBER_ALL_FILMS_RENDERED_CARDS} from "./utils/consts.js";
import {generateFilm} from "./mock/film.js";
import {generateUserRank} from "./mock/user-rank.js";
import {generateSiteMenuFilters} from "./mock/site-menu.js";

const films = new Array(NUMBER_ALL_FILMS_RENDERED_CARDS).fill().map(generateFilm);
const filters = generateSiteMenuFilters(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRank(generateUserRank(filters)));
render(siteMainElement, new SiteMenu(filters));

const filmsList = new FilmsList(siteMainElement);
filmsList.init(films);

const [, watched] = filters;
render(siteFooterElement, new FooterStatistic(watched.count));

