import fetchAndRender from './fetchAndRenderClass';

export default class libraryPage extends fetchAndRender {
  constructor(refs) {
    super(refs);
    this.renderLoader();
    this.renderLibraryheader();

    this.refs.watched = document.querySelector('[data-main="watched"]');
    this.refs.queue = document.querySelector('[data-main="queue"]');

    // this.renderLocalStorage();

    this.renderFooter();
  }

  getItemsFromLocalStorage() {
    const dataString = localStorage.getItem('watched');
    const data = JSON.parse(dataString);

    return data;
  }

  renderLocalStorage() {
    const data = this.getItemsFromLocalStorage();
    const template = this.templateMain(data);
    console.log(template);
  }
}
