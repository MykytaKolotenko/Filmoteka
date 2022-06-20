import Pagination from 'tui-pagination';
import fetchAndRender from './fetchAndRenderClass';

export default class libraryPage extends fetchAndRender {
  constructor(refs) {
    super(refs);
    this.renderLoader();
    this.renderLibraryheader();

    this.refs.watched = document.querySelector('[data-main="watched"]');
    this.refs.queue = document.querySelector('[data-main="queue"]');

    this.getAndRenderLocalStorage('watched');

    this.renderFromBtn();
    this.hideFirstEndPaginationBtn();
  }

  renderFromBtn() {
    this.refs.header.addEventListener('click', e => {
      if (
        e.target.dataset.main === 'watched' ||
        e.target.dataset.main === 'queue'
      ) {
        this.getAndRenderLocalStorage(e.target.dataset.main);
        this.hideFirstEndPaginationBtn();
      }

      if (e.target.dataset.main === 'watched') {
        this.refs.queue.classList.remove('active');
        this.refs.watched.classList.add('active');
        this.hideFirstEndPaginationBtn();
      }

      if (e.target.dataset.main === 'queue') {
        this.refs.watched.classList.remove('active');
        this.refs.queue.classList.add('active');
        this.hideFirstEndPaginationBtn();
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

    this.renderMain(data.slice(0, 9), true, false);

    this.renderContainer(data);

    this.pagination(data);
  }

  pagination(data) {
    const options = {
      totalItems: data.length,
      itemsPerPage: 9,
      visiblePages: 3,
      centerAlign: true,

      template: {
        page: '<button type="button" class="tui-page-btn">{{page}}</button>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<button type="button" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</button>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
      },
    };

    if (data.length <= 9) {
      document.querySelector('.pagination').remove();

      return;
    }

    const container = document.querySelector('.pagination');

    var paganation = new Pagination(container, options);

    paganation.on('afterMove', event => {
      const currentPage = event.page;

      const startSlice = (currentPage - 1) * 9;
      const endSlice = currentPage * 9;
      this.renderMain(data.slice(startSlice, endSlice), true, false);
      this.hideFirstEndPaginationBtn();
    });
  }

  renderContainer() {
    if (document.querySelector('.pagination')) {
      return;
    }

    this.refs.footer.insertAdjacentHTML(
      'beforebegin',
      `<div class="pagination"></div>`
    );
  }
}
