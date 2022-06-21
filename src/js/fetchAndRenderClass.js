import {
  getFilteringMovieByGenre,
  getImage,
  getSearchingMovie,
  getTrendingMovies,
} from './API/api';
import mainFooterTemplate from './components/main/footer/main_footer_template';
import mainHeaderTemplate from './components/main/header/main_header_template';
import jsonGenres from './API/jsonGenres';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import libraryHeaderTemplate from './components/main/library_header/library_header_template';
import genresDataFromId from './components/main/pagination/genresDataFromId';

export default class fetchAndRender {
  constructor() {
    this.refs = {
      header: document.querySelector('header'),
      main: document.querySelector('main'),
      footer: document.querySelector('footer'),
    };

    this.page = 2;
    this.input = '';
    this.selectedGenreIdGlobal = '';
  }

  renderHeader() {
    this.refs.header.innerHTML = mainHeaderTemplate(jsonGenres);
  }

  // ===================== Loader ======================
  async fetchTrendFilms(pageNumber) {
    const { data } = await getTrendingMovies(pageNumber);
    const { results } = data;

    return results;
  }

  // ===================== fetchSearchedMovie ======================
  async fetchSearchedMovie(text, page) {
    const { data } = await getSearchingMovie(text, page);
    const { results } = data;

    return results;
  }

  async fetchFilteringMovieByGenre(genreId, page) {
    const { data } = await getFilteringMovieByGenre(genreId, page);
    const { results } = data;
    return results;
  }

  templateMain(data, fetchPagination = true, searched = false) {
    const dataArr = data;

    const template = dataArr
      .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
        const wordGenres = this.genresFromId(genre_ids);
        const date = release_date.slice(0, 4);
        const image = getImage(poster_path);

        return filmCardTemplate(image, original_title, wordGenres, date, id);
      })
      .join('');

    if (fetchPagination) {
      this.observerPagination(searched);
    }

    return template;
  }

  renderMain(data, fresh = false, fetchPagination = true, searched) {
    const templateWithContainer = `<section class=film><div class="card-container container">${this.templateMain(
      data,
      fetchPagination,
      searched
    )}</div></section> `;

    if (fresh) {
      this.refs.main.innerHTML = templateWithContainer;
    } else {
      this.refs.main.insertAdjacentHTML('beforeend', templateWithContainer);
    }
  }

  // ===================== Footer ============================================

  async renderFooter() {
    this.refs.footer.classList.add('footer');
    this.refs.footer.insertAdjacentHTML('beforeend', mainFooterTemplate());
  }

  // ===================== renderLibraryheader ======================
  renderLibraryheader() {
    this.refs.header.innerHTML = libraryHeaderTemplate();
  }

  genresFromId(arrId) {
    return genresDataFromId(arrId);
  }

  async observerPagination(search = false) {
    const options = {
      root: null,
      rootMargin: '150px',
      threshold: 1.0,
    };

    if (search === 'search') {
      const data = await this.fetchSearchedMovie(this.input, this.page);

      const gallery = document.querySelector('.container');

      const callback = (entries, observer) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(entries[0].target);

          const template = this.templateMain(data, true, 'search');

          document
            .querySelector('.card-container')
            .insertAdjacentHTML('beforeend', template);
        }
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(gallery.lastElementChild);
      this.page = this.page + 1;
    } else if (search === 'genres') {
      this.input = '';
      const data = await this.fetchFilteringMovieByGenre(
        this.selectedGenreIdGlobal,
        this.page
      );

      const gallery = document.querySelector('.container');

      const callback = (entries, observer) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(entries[0].target);

          const template = this.templateMain(data, true, 'genres');

          document
            .querySelector('.card-container')
            .insertAdjacentHTML('beforeend', template);
        }
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(gallery.lastElementChild);
      this.page = this.page + 1;
    } else {
      const data = await this.fetchTrendFilms(this.page);

      const gallery = document.querySelector('.container');

      const callback = (entries, observer) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(entries[0].target);

          const template = this.templateMain(data);

          document
            .querySelector('.card-container')
            .insertAdjacentHTML('beforeend', template);
        }
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(gallery.lastElementChild);
      this.page = this.page + 1;
    }
  }

  // =================== Loader ============================
  renderLoader() {
    const loader = document.querySelector('.loader-box');

    window.onload = function () {
      setTimeout(function () {
        if (!loader.classList.contains('hiden')) {
          loader.classList.add('hiden');
        }
      }, 600);
    };
  }

  hideFirstEndPaginationBtn() {
    if (!document.querySelector('.custom-class-first')) {
      return;
    }

    if (document.documentElement.scrollWidth <= 768) {
      document
        .querySelector('.custom-class-first')
        .classList.add('visually-hidden');

      document
        .querySelector('.custom-class-last')
        .classList.add('visually-hidden');
    } else {
      document
        .querySelector('.custom-class-first')
        .classList.remove('visually-hidden');

      document
        .querySelector('.custom-class-last')
        .classList.remove('visually-hidden');
    }
  }
}
