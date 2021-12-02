
const closeKeyName = 'Escape';


const removePopap = () => {
  const infoPopup = document.querySelector('.film-details');
  infoPopup.remove();
};


document.addEventListener('keydown', (evt) => {
  if (evt.key === closeKeyName) {
    removePopap();
  }
});
