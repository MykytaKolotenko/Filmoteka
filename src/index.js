import main_header_template from './components/main/header/main_header_template';
import RenderCards from './js/renderTrendingFilms';

import {
  getImage,
  getMovie,
  getSearchingMovie,
  getTrendingMovies,
} from './js/API/api';

document
  .querySelector('.container')
  .insertAdjacentHTML('beforeend', main_header_template());

new RenderCards();
// Test!  for delete !!!!!

const fetchMovie = async id => {
  const { data } = await getMovie(id);
  console.log(data);
};

const fetchSearchingMovie = async search => {
  const { data } = await getSearchingMovie(search);
  console.log(data);
};
