export const getTemplateWithNewData = (data, template) => {
  return data.map((item) => template(item)).join(``);
};
