const closeKeyName = 'Escape';


const closeButton = document.querySelector('.close-btn');

const removePopap = () => {
  const infoPopup = document.querySelector('.film-details');
  infoPopup.remove();
};

//document.addEventListener('click', (removePopap));

document.addEventListener('keydown', (evt) => {
  if (evt.key === closeKeyName) {
    removePopap();
  }
});
