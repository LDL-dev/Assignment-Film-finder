const moviesList = document.getElementById('movies__list');

const addMoviesToDOM = array => {
  const moviesPosters = array.map(movie => {
    const newPoster = document.createElement('img');
    newPoster.src = movie.poster;
    
    const newLink = document.createElement('a');
    newLink.href = 'https://www.imdb.com/title/' + movie.imdbID;
    newLink.target = '_blank';
    newLink.appendChild(newPoster);

    const newListItem = document.createElement('li');
    newListItem.appendChild(newLink);
    return newListItem;
    });

  moviesList.innerHTML = '';
  moviesPosters.forEach(item => {
    moviesList.appendChild(item);
  });
};

const filterLatestMovies = () => {
  const filteredMovies = movies
    .filter(movie => (movie.year >= 2014));
  addMoviesToDOM(filteredMovies);
};

const filterMovies = wordInMovie => {
  const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().includes(wordInMovie));
  addMoviesToDOM(filteredMovies);
};

const handleOnChangeEvent = event => {
  const searchTerm = event.target.value;
  if (event.target.type === "search") event.target.value = '';
  if (searchTerm === 'latest') filterLatestMovies()
  else filterMovies(searchTerm);
};

const uncheckRadioButton = () => {
  const checkedRadioButton = document.querySelector('input[type=radio]:checked');
  if (checkedRadioButton) checkedRadioButton.checked = false;
}

const addEventListeners = () => {
  const filterInputs = document.getElementsByName('filter');
  filterInputs.forEach(filterInput => {
    filterInput.addEventListener('change', function(event) {
      handleOnChangeEvent(event);
    });
  });
  const searchField = document.getElementById('nav__search');
  searchField.addEventListener('click', function() {
    uncheckRadioButton();
    addMoviesToDOM(movies);
  });
};

addMoviesToDOM(movies);
addEventListeners();