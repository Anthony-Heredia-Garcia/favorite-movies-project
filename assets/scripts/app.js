const startAddBtn = document.getElementById('add');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn =
  document.querySelector('.modal__actions').firstElementChild;
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const movies = [];

const updateUI = () => {
  if(movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

const renderNewMovieElement = (title, imageUrl, rating) => {
   const newMovieElement = document.createElement('li');
   newMovieElement.className = 'movie-element';
   newMovieElement.innerHTML = `
    <div class='movie-element__image'>
      <img src='${imageUrl}' alt='${title}'>
    </div>
    <div class='movie-element__info'>
      <h2>${title}</h2>
      <p>${rating}/5 Stars</p>
    </div>
   `;
   const listRoot = document.getElementById('movie-list');
   listRoot.append(newMovieElement);
}

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleAddModal = () => {
  addModal.classList.toggle('visible');
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  toggleAddModal();
  clearMovieInputs();
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
  clearMovieInputs();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

const backdropClickHandler = () => {
  toggleAddModal();
  clearMovieInputs();
};

startAddBtn.addEventListener('click', toggleAddModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', backdropClickHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
