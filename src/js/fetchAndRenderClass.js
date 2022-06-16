import { getImage, getSearchingMovie, getTrendingMovies } from './API/api';
import mainFooterTemplate from './components/main/footer/main_footer_template';
import mainHeaderTemplate from './components/main/header/main_header_template';
import jsonGenres from './API/jsonGenres';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import libraryHeaderTemplate from './components/main/library_header/library_header_template';

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
    this.refs.header.insertAdjacentHTML('afterbegin', mainHeaderTemplate());
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
    this.refs.footer.insertAdjacentHTML('beforeend', mainFooterTemplate());
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
