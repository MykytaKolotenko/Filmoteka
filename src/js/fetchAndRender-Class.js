import { getTrendingMovies, getImage, getSearchingMovie } from './API/api.js';
import jsonGenres from './API/jsonGenres.js';
import main_header_template from './components/main/header/main_header_template';
import main_footer_template from './components/main/footer/main_footer_template';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate.js';
import libraryHeaderTemplate from './components/main/library_header/library_header_template';
import logoHome from './components/logoHome.js';

export default class fetchAndRender {
  constructor() {
    this.refs = {
      header: document.querySelector('header'),
      main: document.querySelector('main'),
      footer: document.querySelector('footer'),
    };
  }

  renderHeader() {
    this.refs.header.classList.add('main__header');
    this.refs.header.insertAdjacentHTML('afterbegin', main_header_template());
  }

  async fetchTrendFilms(pageNumber) {
    const { data } = await getTrendingMovies(pageNumber);

    return data;
  }

  async fetchSearchedMovie(text) {
    const { data } = await getSearchingMovie(text);
    return data;
  }

  async renderMain(data) {
    const dataArr = data;
    const { results } = dataArr;
    console.log(data);
    const template = results
      .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
        const wordGenres = this.genresFromId(genre_ids);
        const date = release_date.slice(0, 4);
        const image = getImage(poster_path);

        return filmCardTemplate(image, original_title, wordGenres, date, id);
      })
      .join('');

    const templateWithContainer = `<section class=film><div class="container"><div class="card-container">${template}</div></div></section> `;

    this.refs.main.insertAdjacentHTML('beforeend', templateWithContainer);

    return dataArr;
  }

  async renderFooter() {
    this.refs.footer.classList.add('footer');
    this.refs.footer.insertAdjacentHTML('beforeend', main_footer_template());
  }

  renderLibraryheader() {
    this.refs.header.insertAdjacentHTML('afterbegin', libraryHeaderTemplate());
  }

  genresFromId(arrId) {
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
  }
}
