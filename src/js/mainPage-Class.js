import fetchAndRender from './fetchAndRender-Class';

export default class mainPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderHeader();

    const data = this.fetchTrendFilms();
    this.fetchAndRenderMain(data);

    this.renderFooter();
  }

  // Methods for main page
}
