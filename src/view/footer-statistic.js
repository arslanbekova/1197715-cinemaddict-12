import Abstract from "./abstract.js";

const createFooterStatisticTemplate = (filmsCount) => {
  return (
    `<section class = "footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`
  );
};

export default class FooterStatistic extends Abstract {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsCount);
  }
}
