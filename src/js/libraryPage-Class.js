import fetchAndRender from './fetchAndRender-Class';

export default class libraryPage extends fetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderLibraryheader();

    const data = this.fetchTrendFilms();
    this.fetchAndRenderMain(data);

    this.renderFooter();
  }

  // Methods for library page
}
