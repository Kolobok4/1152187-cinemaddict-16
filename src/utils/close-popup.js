const closeKeyName = 'Escape';


const removePopup = () => {
  const filmPopup = document.querySelector('.film-details');
  filmPopup.remove();
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === closeKeyName) {
    removePopup();
  }
});
