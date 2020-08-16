export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const getTemplate = (data, template) => {
  return data.map((item) => template(item)).join(``);
};
