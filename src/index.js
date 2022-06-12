import RenderFilm from './js/RenderFilm-Class';

import library_header_template from './js/components/main/library_header/library_header_template';

import fetchAndRenderTemplates from './js/renderTrendingFilms.js';

import { getMovie, getImage } from './js/API/api';

document
  .querySelector('body')
  .insertAdjacentHTML('beforeend', main_header_template());

waitRender();

async function waitRender() {
  await fetchAndRenderTemplates();
  
  const refs = {
    filmCard: document.querySelector('.card-container'),
    backdrop: document.querySelector('.backdrop'),
    modalBody: document.querySelector('.modal__content'),
  }

  refs.filmCard.addEventListener('click', onOpenFilmCard);  

  async function onOpenFilmCard(evt) {
  refs.backdrop.classList.remove('is-hidden');

    const movieId = evt.target.parentNode.id;

    const data = await getMovie(movieId);

    const moviePath = data.data.backdrop_path;

    const image = await getImage(moviePath);

    return refs.modalBody.innerHTML = `
    <img src=${image}>
    <p>${data.data.title}</p>
    <p>${data.data.vote_average}</p>
    <p>${data.data.popularity}</p>
    <p>${data.data.original_title}</p>
    <p>${data.data.overview}</p>` 
  }
};

new RenderFilm();
