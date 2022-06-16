import fetchAndRender from './fetchAndRenderClass';

export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderHeader();
    this.fetchAndRenderTrendingFilms();
    this.renderFooter();
  }

  async fetchAndRenderTrendingFilms() {
    const data = await this.fetchTrendFilms();
    this.renderMain(data);
  }
}
