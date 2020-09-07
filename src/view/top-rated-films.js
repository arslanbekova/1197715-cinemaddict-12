import Abstract from "./abstract.js";

const createTopRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
    </section>`
  );
};

export default class TopRatedFilms extends Abstract {

  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}