import main_header_template from './components/main/header/main_header_template';

import library_header_template from './components/main/library_header/library_header_template';

import fetchAndRenderTemplates from './js/renderTrendingFilms.js';

document
  .querySelector('body')
  .insertAdjacentHTML('beforeend', library_header_template());

fetchAndRenderTemplates();
