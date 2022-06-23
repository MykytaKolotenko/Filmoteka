import { getMovie, getImage } from '../../API/api';
import modalCardTemplate from './modalCardTemplate';
import svg from '../../../images/symbol-defs.svg';
import reRender from '../reRender.js';

export default class ModalAPI {
  constructor() {
    this.renderBackdropMarkup();
    this.refs = {
      cardContainer: document.querySelector('main'),
      backdrop: document.querySelector('.backdrop'),
      modalBody: document.querySelector('.modal__content-wrapp'),
      closeBtn: document.querySelector('.modal__close-btn'),
      filmCardLocalStorage: {},
      localStorageWatchedData: [],
      localStorageQueueData: [],
    };
    this.refs.cardContainer.addEventListener(
      'click',
      this.openFilmCard.bind(this)
    );
    // CLOSE MODAL
    this.refs.backdrop.addEventListener(
      'click',
      this.onBackdropClick.bind(this)
    );
    window.addEventListener('keydown', this.onEscKeyPress.bind(this));
    // this.refs.backdrop.addEventListener('keydown', this.onEscKeyPress.bind(this));
    // END CLOSE MODAL
    this.refs.modalBody.addEventListener(
      'click',
      this.setLocalStorageData.bind(this)
    );
  }

  async openFilmCard(evt) {
    const targetTag = evt.target.parentNode.classList.contains('film__card');

    if (!targetTag) {
      return;
    }

    const movieId = evt.target.parentNode.id;
    const { data } = await getMovie(movieId);
    const moviePath = data.poster_path;
    const movieImage = await getImage(moviePath);
    const movieGenres = Object.values(data.genres)
      .map(genres => genres.name)
      .join(', ');

    this.setFilmCardLocalStorageData(data);

    this.refs.backdrop.classList.remove('is-hidden');
    this.refs.closeBtn.addEventListener('click', this.closeModal.bind(this));

    this.setLocStorWatchedDataOnLoad();
    this.setLocStorQueueDataOnLoad();

    const btnProperties = {
      watchedBtnText: 'add to Watched',
      watchedBtnDisabled: '',
      watchedClassButtonOrange: 'button__orange',
      queueBtnText: 'add to queue',
      queueBtnDisabled: '',
      queueClassButtonOrange: '',
    };

    this.addToViewedBtn(evt, btnProperties);
    this.addToQueueBtn(evt, btnProperties);

    return (this.refs.modalBody.innerHTML = modalCardTemplate(
      movieImage,
      data.title,
      data.vote_average,
      data.vote_count,
      data.popularity,
      data.original_title,
      movieGenres,
      data.overview,
      btnProperties.watchedClassButtonOrange,
      btnProperties.watchedBtnDisabled,
      btnProperties.watchedBtnText,
      btnProperties.queueClassButtonOrange,
      btnProperties.queueBtnDisabled,
      btnProperties.queueBtnText
    ));
  }

  // CLOSE MODAL
  onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      console.log(this);
      this.closeModal();
    }
  }

  onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
      this.closeModal();
    }
  }
  // END CLOSE MODAL

  closeModal() {
    this.refs.backdrop.classList.add('is-hidden');

    if (document.querySelector('[data-main="watched"].active')) {
      reRender('watched');
    }

    if (document.querySelector('[data-main="queue"].active')) {
      reRender('queue');
    }
  }

  renderBackdropMarkup() {
    const backdropMarkup = `<div class="backdrop is-hidden">
        <div class="modal">
        <button class="modal__close-btn">Exit
          <svg class="modal__close-btn-icon" alt="close"  width="30px" height="30px">
            <use href="${svg + '#icon-close'}"></use>
          </svg>
        </button>
        <div class="modal__content-wrapp"></div>
        </div></div>`;

    document.body.insertAdjacentHTML('beforeend', backdropMarkup);
  }

  setLocalStorageData(evt) {
    if (evt.target.id === 'watched' && evt.target.disabled === false) {
      const queuedBtn = document.querySelector('#queue');

      this.refs.localStorageWatchedData.push(this.refs.filmCardLocalStorage);
      this.filterQueueData();
      this.toggleActiveBtn(queuedBtn, evt);

      localStorage.setItem(
        'watched',
        JSON.stringify(this.refs.localStorageWatchedData)
      );
    } else if (evt.target.id === 'queue' && evt.target.disabled === false) {
      const watchedBtn = document.querySelector('#watched');

      this.refs.localStorageQueueData.push(this.refs.filmCardLocalStorage);
      this.filterWatchedData();
      this.toggleActiveBtn(watchedBtn, evt);

      localStorage.setItem(
        'queue',
        JSON.stringify(this.refs.localStorageQueueData)
      );
    }
  }

  setFilmCardLocalStorageData(item) {
    const genresId = item.genres.map(value => value.id);

    const filmCard = {
      original_title: item.original_title,
      poster_path: item.poster_path,
      genre_ids: genresId,
      image: getImage(item.poster_path),
      id: item.id,
      overview: item.overview,
      popularity: item.popularity,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre: item.genres[0].name,
      release_date: item.release_date.slice(0, 4),
    };

    this.refs.filmCardLocalStorage = filmCard;
  }

  addToViewedBtn(event, btn) {
    const locStorWatchedKey = localStorage.getItem('watched');

    if (locStorWatchedKey) {
      const locStorWatched = JSON.parse(locStorWatchedKey);
      const statusWatchedBtn = locStorWatched.map(value => {
        if (Number(value.id) === Number(event.target.parentNode.id)) {
          btn.watchedBtnText = 'added to watched';
          btn.watchedBtnDisabled = 'disabled';
          btn.queueClassButtonOrange = 'button__orange';
          btn.watchedClassButtonOrange = '';
        }
      });
    }
  }

  addToQueueBtn(event, btn) {
    const locStorQueueKey = localStorage.getItem('queue');

    if (locStorQueueKey) {
      const locStorQueue = JSON.parse(locStorQueueKey);
      const statusQueueBtn = locStorQueue.map(value => {
        if (Number(value.id) === Number(event.target.parentNode.id)) {
          btn.queueBtnText = 'added to queue';
          btn.queueBtnDisabled = 'disabled';
        }
      });
    }
  }

  toggleActiveBtn(btn, event) {
    if (event.target.id === 'watched') {
      btn.disabled = false;
      btn.classList.add('button__orange');
      btn.textContent = 'add to queue';
      event.target.disabled = true;
      event.target.classList.remove('button__orange');
      event.target.textContent = 'added to watched';
    } else {
      btn.disabled = false;
      btn.classList.add('button__orange');
      btn.textContent = 'add to watched';
      event.target.disabled = true;
      event.target.classList.remove('button__orange');
      event.target.textContent = 'added to queue';
    }
  }

  filterQueueData() {
    const filtereWatchedItems = this.refs.localStorageQueueData.filter(
      response => response.id !== this.refs.filmCardLocalStorage.id
    );

    if (filtereWatchedItems.length > 0) {
      this.refs.localStorageQueueData = filtereWatchedItems;
      localStorage.setItem(
        'queue',
        JSON.stringify(this.refs.localStorageQueueData)
      );
    } else {
      this.refs.localStorageQueueData = filtereWatchedItems;
      localStorage.setItem(
        'queue',
        JSON.stringify(this.refs.localStorageQueueData)
      );
    }
  }
  filterWatchedData() {
    const filteredQueueItems = this.refs.localStorageWatchedData.filter(
      response => response.id !== this.refs.filmCardLocalStorage.id
    );

    if (filteredQueueItems.length > 0) {
      this.refs.localStorageWatchedData = filteredQueueItems;
      localStorage.setItem(
        'watched',
        JSON.stringify(this.refs.localStorageWatchedData)
      );
    } else {
      this.refs.localStorageWatchedData = filteredQueueItems;
      localStorage.setItem(
        'watched',
        JSON.stringify(this.refs.localStorageWatchedData)
      );
    }
  }

  setLocStorWatchedDataOnLoad() {
    const locStorWatchedKey = localStorage.getItem('watched');

    if (locStorWatchedKey) {
      const TestlocStorWatched = JSON.parse(locStorWatchedKey);

      this.refs.localStorageWatchedData = TestlocStorWatched;
    }
  }

  setLocStorQueueDataOnLoad() {
    const locStorQueueKey = localStorage.getItem('queue');

    if (locStorQueueKey) {
      const TestlocStorQueue = JSON.parse(locStorQueueKey);

      this.refs.localStorageQueueData = TestlocStorQueue;
    }
  }
}
