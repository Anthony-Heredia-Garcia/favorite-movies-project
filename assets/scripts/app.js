const startAddBtn = document.getElementById('add');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn =
  document.querySelector('.modal__actions').firstElementChild;
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if(movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

const deleteMovie = () => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  
}

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionButton.addEventListener('click', cancelMovieDeletion);
  confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
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
   newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
   const listRoot = document.getElementById('movie-list');
   listRoot.append(newMovieElement);
}

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addModal.classList.remove('visible');
}

const showMovieModal = () => {
  addModal.classList.add('visible');
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  showMovieModal();
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
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  }
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};

startAddBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', backdropClickHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
