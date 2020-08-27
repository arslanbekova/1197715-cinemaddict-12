export const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case `afterend`:
      container.prepend(element);
      break;
    case `beforeend`:
      container.append(element);
      break;
  }
};
