import Pagination from 'tui-pagination';
import fetchAndRender from './fetchAndRenderClass';

export default class libraryPage extends fetchAndRender {
  constructor(refs) {
    super(refs);
    this.renderLoader();
    this.renderLibraryheader();

    this.refs.watched = document.querySelector('[data-main="watched"]');
    this.refs.queue = document.querySelector('[data-main="queue"]');

    this.refs.footer.insertAdjacentHTML(
      'beforebegin',
      `<div class="pagination"></div>`
    );

    this.getAndRenderLocalStorage('watched');

    this.renderFooter();

    this.renderFromBtn();
  }

  renderFromBtn() {
    this.refs.header.addEventListener('click', e => {
      if (
        e.target.dataset.main === 'watched' ||
        e.target.dataset.main === 'queue'
      ) {
        this.getAndRenderLocalStorage(e.target.dataset.main);
      }

      if (e.target.dataset.main === 'watched') {
        this.refs.queue.classList.remove('active');
        this.refs.watched.classList.add('active');
      }

      if (e.target.dataset.main === 'queue') {
        this.refs.watched.classList.remove('active');
        this.refs.queue.classList.add('active');
      }
    });
  }

  getItemsFromLocalStorage(dataBtn) {
    const dataString = localStorage.getItem(dataBtn);
    const data = JSON.parse(dataString);

    return data;
  }

  getAndRenderLocalStorage(dataBtn) {
    const data = this.getItemsFromLocalStorage(dataBtn);

    if (data === null) {
      const failTenplate = `<div> No films</div>`;

      this.refs.main.innerHTML = failTenplate;
      document.querySelector('.pagination').innerHTML = '';
      return;
    }

    this.renderMain(data.slice(0, 6), true, false);

    this.pagination(data);
  }

  pagination(data) {
    const options = {
      totalItems: data.length,
      itemsPerPage: 6,
      visiblePages: 3,
      centerAlign: true,

      template: {
        page: '<a href="{{page}}" class="pagination__page-btn">{{page}}</a>',
      },
    };

    const container = document.querySelector('.pagination');

    var paganation = new Pagination(container, options);

    paganation.on('afterMove', event => {
      const currentPage = event.page;

      const startSlice = (currentPage - 1) * 6;
      const endSlice = currentPage * 6;
      this.renderMain(data.slice(startSlice, endSlice), true, false);
      console.log(startSlice, endSlice);
    });
  }
}
