export const createFooterStatisticTemplate = (filmsCount) => {
  return (
    `<section class = "footer__statistics">
      <p>${filmsCount()} movies inside</p>
    </section>`
  );
};
