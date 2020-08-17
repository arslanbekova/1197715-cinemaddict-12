export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const getTemplate = (data, template) => {
  return data.map((item) => template(item)).join(``);
};

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFractional = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return lower + Math.random() * (upper - lower);
};

export const generateRandomList = (data) => {

  const shuffledList = data.sort(() => 0.5 - Math.random());

  let randomList = [];

  for (let i = 0; i < getRandomInteger(data.length); i++) {
    randomList.push(shuffledList[Math.floor(Math.random() * shuffledList.length)]);
  }

  return randomList.join(`, `);
};
