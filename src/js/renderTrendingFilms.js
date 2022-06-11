import { getTrendingMovies } from './API/api.js';
import jsonGenres from './API/genres.js';
import film_card from '../components/film_card/film_card.js';
import { getImage } from './API/api.js';

export default class RenderCards {
  constructor() {
    this.renderLink = document.querySelector('body');

    this.fetchAndRenderTemplates();
  }

  fetchAndRenderTemplates = async () => {
    const { data } = await getTrendingMovies();
    const { page } = data;
    const { results } = await data;

    const template = results
      .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
        return film_card(
          getImage(poster_path),
          original_title,
          this.genresFromId(genre_ids),
          release_date.slice(0, 4),
          id
        );
      })
      .join('');

    const templateWithContaimer = `<div class="container"><div class="card-container">${template}</div></div> `;

    this.renderLink.insertAdjacentHTML('beforeend', templateWithContaimer);
    return page;
  };

  genresFromId = arrId => {
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
}
