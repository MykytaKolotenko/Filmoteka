import { getMovie, getImage } from '../../API/api';

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

    return (this.refs.modalBody.innerHTML = `<div class="modal__image-wrapper">
        <img src=${movieImage} class="modal__image" >
        </div>
        <div class="modal__content">
        <h2 class="modal__title">${data.title}</h2>
        <div class="modal__film-info">
        <div class="film-info__wrapp">
        <p class="film-info__property">Vote / Votes</p>
        <div class="film-info__value">
        <div class="film-info__value--orange">${data.vote_average}</div>
        <div class="film-info__value--slash"> / </div>
        <div class="film-info__value--grey">${data.vote_count}</div>
        </div>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Popularity</p>
        <p class="film-info__value">${data.popularity}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Original Title</p>
        <p class="film-info__value film-info__value--big">${data.original_title}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Genre</p>
        <p class="film-info__value">${movieGenres}</p>
        </div>
        </div>
        <div class="modal__overview">
        <p class="overview__title">About</p>
        <p class="overview__text">${data.overview}</p>
        </div>
        <div class="modal__buttons">
        <button class="button ${btnProperties.watchedClassButtonOrange}" id="watched" ${btnProperties.watchedBtnDisabled}>${btnProperties.watchedBtnText}</button>
        <button class="button ${btnProperties.queueClassButtonOrange}" id="queue" ${btnProperties.queueBtnDisabled}>${btnProperties.queueBtnText}</button>
        </div>
        </div>`);
  }

  closeModal() {
    this.refs.backdrop.classList.add('is-hidden');
  }

  renderBackdropMarkup() {
    const backdropMarkup = `<div class="backdrop is-hidden">
        <div class="modal">
        <button class="modal__close-btn"></button>
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
    const filmCard = {
      title: item.original_title,
      image: getImage(item.poster_path),
      id: item.id,
      overview: item.overview,
      popularity: item.popularity,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre: item.genres[0].name,
      date: item.release_date.slice(0, 4),
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
}

// const refs = {
//     cardContainer: document.querySelector('main'),
//     backdrop: document.querySelector('.backdrop'),
//     modalBody: document.querySelector('.modal__content'),
//     closeBtn: document.querySelector('.modal__close-btn')
// }

// refs.cardContainer.addEventListener('click', openFilmCard);

// async function openFilmCard(evt) {

//     const targetTag = evt.target.parentNode.classList.contains('film__card');

//     if (!targetTag) {
//         return;
//     }

//     const movieId = evt.target.parentNode.id;
//     const data = await getMovie(movieId);
//     const moviePath = data.data.poster_path;
//     const movieImage = await getImage(moviePath);
//     const movieGenres = Object.values(data.data.genres).map(genres => genres.name).join(' ')

//     refs.backdrop.classList.remove('is-hidden');

//     return refs.modalBody.innerHTML =
//         `<div class="modal__image-wrapper">
//         <img src=${movieImage} class="modal__image" >
//         </div>
//         <div class="modal__film-info">
//         <h2 class="film-info__title">${data.data.title}</h2>
//         <p class="film-info__property">Vote / Votes</p>
//         <p class="film-info__property">Popularity</p>
//         <p class="film-info__property">Original Title</p>
//         <p class="film-info__property">Genre</p>
//         <p class="film-info__value">${data.data.vote_average}/${data.data.vote_count}</p>
//         <p class="film-info__value">${data.data.popularity}</p>
//         <p class="film-info__value">${data.data.original_title}</p>
//         <p class="film-info__value">${movieGenres}</p>
//         </div>
//         <div class="modal__overview">
//         <p class="overview__title">About</p>
//         <p class="overview__text">${data.data.overview}</p>
//         </div>`
// }

// refs.closeBtn.addEventListener('click', closeModal);

// function closeModal() {
//     refs.backdrop.classList.add('is-hidden');
// }
