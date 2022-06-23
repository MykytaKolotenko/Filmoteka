// I am so sorry not enought time to fix Library Page bug. It's a hard code!!!!!!!!!!!!!!!!!!!!

import Pagination from 'tui-pagination';
import { getImage } from '../API/api';
import filmCardTemplate from './filmCardTemplate/filmCardTemplate';
import genresDataFromId from './main/pagination/genresDataFromId';

const refs = {
  main: document.querySelector('main'),
  footer: document.querySelector('footer'),
};

export default function reRender(dataBtn) {
  const data = getItemsFromLocalStorage(dataBtn);

  if (data === null) {
    const failTenplate = `<div class="container no-films"><h2 > There are no films!</h2></div>`;

    refs.main.innerHTML = failTenplate;
    pagination(data);

    return;
  }

  if (data.length <= 0) {
    const failTenplate = `<div class="container no-films"><h2> There are no films!</h2></div>`;

    refs.main.innerHTML = failTenplate;
    pagination(data);

    return;
  }

  renderMain(data.slice(0, 9), true, false, false);
  renderContainer(data);

  pagination(data);
}

const pagination = data => {
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
    renderMain(data.slice(startSlice, endSlice), true, false);
    hideFirstEndPaginationBtn();
  });
};

async function renderMain(
  data,
  fresh = false,
  fetchPagination = true,
  searched
) {
  const templateWithContainer = `<section class=film><div class="card-container container">${await templateMain(
    data,
    fetchPagination,
    searched
  )}</div></section> `;

  if (fresh) {
    refs.main.innerHTML = templateWithContainer;
  } else {
    refs.main.insertAdjacentHTML('beforeend', templateWithContainer);
  }
}

function renderContainer() {
  if (document.querySelector('.pagination')) {
    return;
  }

  refs.footer.insertAdjacentHTML(
    'beforebegin',
    `<div class="pagination"></div>`
  );
}

function getItemsFromLocalStorage(dataBtn) {
  const dataString = localStorage.getItem(dataBtn);
  const data = JSON.parse(dataString);

  return data;
}

function hideFirstEndPaginationBtn() {
  if (!document.querySelector('.custom-class-first')) {
    return;
  }

  if (document.documentElement.scrollWidth <= 768) {
    document
      .querySelector('.custom-class-first')
      .classList.add('visually-hidden');

    document
      .querySelector('.custom-class-last')
      .classList.add('visually-hidden');
  } else {
    document
      .querySelector('.custom-class-first')
      .classList.remove('visually-hidden');

    document
      .querySelector('.custom-class-last')
      .classList.remove('visually-hidden');
  }
}

async function templateMain(data, fetchPagination = true, searched = false) {
  const dataArr = data;

  const template = dataArr
    .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
      const wordGenres = genresDataFromId(genre_ids);
      const date = release_date.slice(0, 4);
      const image = getImage(poster_path);

      return filmCardTemplate(image, original_title, wordGenres, date, id);
    })
    .join('');

  return template;
}
