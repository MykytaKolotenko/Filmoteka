import InfiniteScroll from 'infinite-scroll';
import { getImage, urlTrendingMovies } from './API/api';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import fetchAndRender from './fetchAndRender-Class';

export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderHeader();

    this.fetchAndRenderTrendingFilms();

    this.renderFooter();

    this.addEventListeners();
  }

  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();
    this.renderMain(data);
  }

  async fetchAndRenderSearchFilms(text) {
    const data = await this.fetchSearchedMovie(text);

    if (!data.results.length) {
      alert('no films found');
      return;
    }
    
    this.renderMain(data, true);
  }

  addEventListeners () {
    const searchIcon = document.getElementById('searchIcon');

    searchIcon.addEventListener('click', function () {
      const searchField = document.getElementById('searchField');
      const text = searchField.value;

      this.fetchAndRenderSearchFilms(text);
    }.bind(this));
  }
}
