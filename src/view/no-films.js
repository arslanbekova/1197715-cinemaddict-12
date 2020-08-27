import Abstract from "./abstract.js";

const createNoFilmsTenplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class noFilms extends Abstract {

  getTemplate() {
    return createNoFilmsTenplate();
  }
}
