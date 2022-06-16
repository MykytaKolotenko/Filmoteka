import fetchAndRender from './fetchAndRenderClass';

export default class libraryPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderLibraryheader();

    this.renderLibraryMain();

    this.renderFooter();
  }

  async renderLibraryMain() {
    const data = await this.fetchTrendFilms();

    this.renderMain(data);
  }
}
