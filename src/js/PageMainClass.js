import FetchAndRender from './RenderAndFetchClass.js';

import Notiflix, { Notify } from 'notiflix';
import Switcher from './components/main/header/switcher';
import LibraryPage from './PageLibraryClass.js';

export default class MainPage extends FetchAndRender {
  constructor(refs) {
    super(refs);
    Notiflix.Notify.init({
      width: '280px',
      position: 'center-top',
    });

    this.renderHeader();
    this.onSearchMovie();
    this.movieByGenres();

    this.fakeFooterOnce();
    this.fetchAndRenderTrendingFilms();
    this.renderBtnTop();
  }
  // =================== fetchAndRenderTrendingFilms ============================
  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();

    this.renderMain(data, true);
    new Switcher();
  }

  // =================== Btn_To_Top ============================
  renderBtnTop() {
    const elmToTop = ` <div class="to-top"><button class="btn-to-top" data-main="up"></button></div>`;
    this.refs.header.insertAdjacentHTML('beforeend', elmToTop);
    const btnToTop = document.querySelector('.to-top');
    btnToTop.style.display = 'none';
    btnToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    setInterval(function displayBtnScrollTop() {
      if (window.scrollY >= 500) {
        btnToTop.style.display = 'inline-block';
      } else {
        btnToTop.style.display = 'none';
      }
    }, 250);
  }

  onChangePage() {
    this.refs.header.addEventListener('click', e => {
      if (
        e.target.dataset.main === 'home' ||
        e.target.dataset.main === 'homeLogo'
      ) {
        new MainPage();

        if (document.querySelector('.pagination')) {
          document.querySelector('.pagination').remove();
        }
      }

      if (e.target.dataset.main === 'library') {
        new LibraryPage();
      }
    });
  }
  // ============================ Search =======================================
  onSearchMovie() {
    this.refs.searchInput = document.querySelector('#searchField');
    let searchTimeout;
    this.refs.searchInput.addEventListener('input', evt => {
      if (evt.target.nodeName !== 'INPUT') {
        return;
      }

      if (evt.target.value.trim().length === 0) {
        this.fetchAndRenderTrendingFilms();
        this.page = 2;
        return;
      }

      this.page = 2;
      this.input = evt.target.value.trim();
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        const data = this.fetchSearchedMovie(this.input).then(data => {
          if (data.length === 0) {
            this.fetchTrendFilms().then(data => this.renderMain(data, true));
            this.input = '';
            evt.target.value = this.input;
            this.genresSelect.selectedIndex = 0;
            this.genresSelectCloseBtn.classList.remove('active');
            return Notify.failure(
              'Search result not successful. Enter the correct movie name and try again'
            );
          }

          this.renderMain(data, true, true, 'search');

          this.genresSelect.selectedIndex = 0;
          this.genresSelectCloseBtn.classList.remove('active');
        });
      }, 450);
    });
  }

  movieByGenres() {
    this.genresSelect = document.getElementById('ganres_select');
    this.genresSelectCloseBtn = document.getElementById('ganres_select-close');

    this.genresSelect.onchange = event => {
      const selectedGenreId = +event.target.value;

      this.fetchAndRenderGenresMovie(selectedGenreId);
      if (selectedGenreId > 0) {
        this.genresSelectCloseBtn.classList.add('active');
      } else {
        this.genresSelectCloseBtn.classList.remove('active');
      }

      this.page = 2;
      this.selectedGenreIdGlobal = selectedGenreId;
      this.refs.searchInput.value = '';
    };

    this.genresSelectCloseBtn.onclick = () => {
      this.genresSelect.selectedIndex = 0;
      this.fetchAndRenderTrendingFilms();
      this.genresSelectCloseBtn.classList.remove('active');
    };
  }

  async fetchAndRenderGenresMovie(genreId) {
    if (genreId === 0) {
      const data = await this.fetchTrendFilms();
      this.renderMain(data, true, true);
    } else {
      const data = await this.fetchFilteringMovieByGenre(genreId);
      this.renderMain(data, true, true, 'genres');
    }
  }

  fakeFooterOnce() {
    if (document.querySelector('.fake__footer')) {
      return;
    }
    this.refs.footer.insertAdjacentHTML(
      'afterend',
      `<div class="fake__footer"></div>`
    );
  }
}
