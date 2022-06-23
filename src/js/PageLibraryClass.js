import Pagination from 'tui-pagination';
import Switcher from './components/main/header/switcher';
import FetchAndRender from './RenderAndFetchClass';

export default class LibraryPage extends FetchAndRender {
  constructor(refs) {
    super(refs);

    this.renderLibraryheader();

    this.refs.watched = document.querySelector('[data-main="watched"]');
    this.refs.queue = document.querySelector('[data-main="queue"]');

    this.getAndRenderLocalStorage('watched');

    this.renderFromBtn();
    this.hideFirstEndPaginationBtn();

    new Switcher();
  }

  renderFromBtn() {
    this.refs.header.addEventListener('click', e => {
      if (e.target.dataset.main === 'watched') {
        this.refs.queue.classList.remove('active');
        this.refs.watched.classList.add('active');
        this.getAndRenderLocalStorage(e.target.dataset.main);
      }

      if (e.target.dataset.main === 'queue') {
        this.refs.watched.classList.remove('active');
        this.refs.queue.classList.add('active');
        this.getAndRenderLocalStorage(e.target.dataset.main);
      }
      this.hideFirstEndPaginationBtn();
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
      const failTenplate = `<div class="container no-films"><h2 > There are no films!</h2></div>`;

      this.refs.main.innerHTML = failTenplate;
      this.pagination(data);

      return;
    }

    if (data.length <= 0) {
      const failTenplate = `<div class="container no-films"><h2> There are no films!</h2></div>`;

      this.refs.main.innerHTML = failTenplate;
      this.pagination(data);

      return;
    }

    this.renderMain(data.slice(0, 9), true, false, false);
    this.renderContainer(data);

    this.pagination(data);

    this.offLoaderSquare();
  }

  pagination(data) {
    console.log(data);
    if (data === null || data.length === 0) {
      if (document.querySelector('.pagination')) {
        document.querySelector('.pagination').remove();
      }
      return;
    }

    if (data.length <= 9) {
      if (document.querySelector('.pagination')) {
        document.querySelector('.pagination').remove();
      }
      return;
    }

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
        moreButton:
          '<button href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</button>',
      },
    };

    const container = document.querySelector('.pagination');

    var paganation = new Pagination(container, options);

    paganation.on('afterMove', event => {
      const currentPage = event.page;

      const startSlice = (currentPage - 1) * 9;
      const endSlice = currentPage * 9;
      this.renderMain(data.slice(startSlice, endSlice), true, false);
      this.hideFirstEndPaginationBtn();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
