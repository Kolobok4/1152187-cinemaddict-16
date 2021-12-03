export const setValidityCount = (text, count) => {
  let textContent = text ? text : '';

  if (textContent.length > count) {
    textContent = `${textContent.substring(0, count)  }...`;
  }

  return textContent;
};
