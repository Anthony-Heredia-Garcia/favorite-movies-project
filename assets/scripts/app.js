const startAddBtn = document.getElementById('add');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn =
  document.querySelector('.modal__actions').firstElementChild;
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addModal.querySelectorAll('input');

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleAddModal = () => {
  addModal.classList.toggle('visible');
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  toggleAddModal();
};

const clearMovieInputs = () => {
  for (const input of userInputs){
    input.value = '';
  }
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue === '' ||
    ratingValue === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  }
  movies.push(newMovie);
  console.log(movies);
  toggleAddModal();
};

const backdropClickHandler = () => {
  toggleAddModal();
};

startAddBtn.addEventListener('click', toggleAddModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', backdropClickHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
