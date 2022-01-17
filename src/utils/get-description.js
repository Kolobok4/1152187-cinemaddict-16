import {DESCRIPTION_COUNT} from '../const';

export const getDescription = (description) => {
  let editedDescription = description;
  const descriptionLength = editedDescription.length;

  if (descriptionLength > DESCRIPTION_COUNT) {
    editedDescription = `${editedDescription.slice(0, DESCRIPTION_COUNT - 1)}...`;
  }

  return editedDescription;
};
