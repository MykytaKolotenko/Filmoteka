import main_header_template from './components/main/header/main_header_template';

import library_header_template from './components/main/library_header/library_header_template';
import RenderCards from './js/renderTrendingFilms';

import RenderCards, { fetchAndRenderTemplates } from './js/renderTrendingFilms';


import {
  getImage,
  getMovie,
  getSearchingMovie,
  getTrendingMovies,
} from './js/API/api';

document
  .querySelector('body')
  .insertAdjacentHTML('beforeend', main_header_template());
