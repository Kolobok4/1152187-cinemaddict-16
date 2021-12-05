const closeKeyNameLong = 'Escape';
const closeKeyNameShort = 'Esc';

const closePopup = () => {
  const filmPopup = document.querySelector('.film-details');
  filmPopup.remove();
};

document.addEventListener('keydown', (evt) => {
  const isEscKey = evt.key === closeKeyNameLong || evt.key === closeKeyNameShort;
  if (isEscKey) {
    closePopup();
  }
});


