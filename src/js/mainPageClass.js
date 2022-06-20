import InfiniteScroll from 'infinite-scroll';
import { getImage, urlTrendingMovies } from './API/api';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import fetchAndRender from './fetchAndRenderClass';
import libraryPage from './libraryPageClass';

export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderHeader();
    this.onSearchMovie();
    this.renderLoader();

    this.fetchAndRenderTrendingFilms();
    this.fakeFooterOnce();
  }
  // =================== fetchAndRenderTrendingFilms ============================
  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();
    this.renderMain(data, true);
    this.rendenBtnTop();
  }

  // =================== Btn_To_Top ============================
  rendenBtnTop() {
    const elmToTop = ` <div class="to-top"><button class="btn-to-top" data-main="up"></button></div>`;
    this.refs.main.insertAdjacentHTML('afterbegin', elmToTop);
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
        new mainPage();

        if (document.querySelector('.pagination')) {
          document.querySelector('.pagination').remove();
        }
      }

      if (e.target.dataset.main === 'library') {
        new libraryPage();
      }
    });
  }

  onSearchMovie() {
    const searchInput = document.querySelector('#searchField');
    let searchTimeout;
    searchInput.addEventListener('input', evt => {
      if (evt.target.nodeName !== 'INPUT') {
        return;
      }

      if (evt.target.value.trim().length == 0) {
        this.fetchAndRenderTrendingFilms();
        return;
      }

      this.page = 2;
      this.input = evt.target.value.trim();
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        const data = this.fetchSearchedMovie(this.input).then(data => {
          if (data.length === 0) {
            console.log('No films');
            this.fetchAndRenderTrendingFilms();
            return;
          }
          console.log(data);
          this.renderMain(data, true, true, true);

          this.rendenBtnTop();
        });
      }, 450);
    });
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
