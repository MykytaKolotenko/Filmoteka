import { getTrendingMovies } from './API/api.js';
import jsonGenres from './API/genres.js';
import filmCardTemplate from '../components/film_card/filmCardTemplate.js';
import { getImage } from './API/api.js';

export default class RenderCards {
  constructor() {
    this.renderLink = document.querySelector('body');

    fetchAndRenderTemplates(this.renderLink);
  }
}

const fetchAndRenderTemplates = async renderLink => {
  const { data } = await getTrendingMovies();
  const { page } = data;
  const { results } = await data;

  const template = results
    .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
      const wordGenres = genresFromId(genre_ids);
      const date = release_date.slice(0, 4);
      const image = getImage(poster_path);

      return filmCardTemplate(image, original_title, wordGenres, date, id);
    })
    .join('');

  const templateWithContaimer = `<div class="container"><div class="card-container">${template}</div></div> `;

  renderLink.insertAdjacentHTML('beforeend', templateWithContaimer);
  return page;
};

const genresFromId = arrId => {
  const genres = jsonGenres;
  const genresName = [];

  for (let i = 0; i < genres.length; i++) {
    if (genres[i].id === arrId[0]) {
      genresName.push(genres[i].name);
    }

    if (genres[i].id === arrId[1]) {
      genresName.push(genres[i].name);
    }
  }

  if (arrId[3]) {
    genresName.push('other');
  }

  return genresName.join(', ');
};
