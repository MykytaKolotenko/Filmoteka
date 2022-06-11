import { getTrendingMovies } from './API/api';
import jsonGenres from './API/genres.json';
import film_card from '../components/film_card/film_card';
import { getImage } from './API/api';

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
    const { genres } = jsonGenres;
    const genresname = [];

    arrId.forEach(el =>
      genres.filter(obj => {
        if (obj.id === el) {
          genresname.push(obj.name);
        }
      })
    );

    return [genresname[0], genresname[1], 'Other'].join(', ');
  };
}
