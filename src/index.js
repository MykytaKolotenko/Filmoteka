import main_header_template from './js/components/main/header/main_header_template';

import main_footer_template from './js/components/main/footer/main_footer_template';
// import library_header_template from './js/components/main/library_header/library_header_template';

// import fetchAndRenderTemplates from './js/renderTrendingFilms.js';

import library_header_template from './js/components/main/library_header/library_header_template';
import RenderFilm from './js/RenderFilm-Class';


document
  .querySelector('body')
  .insertAdjacentHTML('beforeend', main_header_template());

// ____________________

document
  .querySelector('body')
  .insertAdjacentHTML('afterend', main_footer_template());


new RenderFilm();

