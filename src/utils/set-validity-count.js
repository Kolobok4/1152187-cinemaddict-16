export const setValidityCount = (text, count) => {
  let filteredTextContent = text ? text : '';

  if (filteredTextContent.length > count) {
    filteredTextContent = `${filteredTextContent.substring(0, count)  }...`;
  }

  return filteredTextContent;
};
