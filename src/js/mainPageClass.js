import InfiniteScroll from 'infinite-scroll';
import { getImage, urlTrendingMovies } from './API/api';
import filmCardTemplate from './components/filmCardTemplate/filmCardTemplate';
import infinityPagination from './components/main/pagination/infinity_scroll';
import fetchAndRender from './fetchAndRender-Class';



export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderHeader();

    this.fetchAndRenderTrendingFilms();

    this.renderFooter();

    infinityPagination()
  }

  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();
    this.renderMain(data);
  }
  
}
