import { getMovie, getImage } from '../../API/api';

const refs = {
    cardContainer: document.querySelector('main'),
    backdrop: document.querySelector('.backdrop'),
    modalBody: document.querySelector('.modal__content'),
    closeBtn: document.querySelector('.modal__close-btn')
}
  
refs.cardContainer.addEventListener('click', openFilmCard);
refs.closeBtn.addEventListener('click', closeModal);

async function openFilmCard(evt) {
    
    const movieId = evt.target.parentNode.id;
    const data = await getMovie(movieId);
    const moviePath = data.data.poster_path;
    const movieImage = await getImage(moviePath);
    const targetTag = evt.target.parentNode.nodeName;

    const movieGenres = Object.values(data.data.genres).map(genres => genres.name).join(' ')

    console.log(data.data)

    if (targetTag !== "LI") {
        return; 
    }
    refs.backdrop.classList.remove('is-hidden');

    return refs.modalBody.innerHTML = 
        `<div class="modal__image-wrapper">
        <img src=${movieImage} class="modal__image" >
        </div>
        <div class="modal__film-info">
        <p class="modal__title">${data.data.title}</p>
        
        <p>${data.data.vote_average}/${data.data.vote_count}</p>
        <p>${data.data.popularity}</p>
        <p>${data.data.original_title}</p>
        <p>${movieGenres}</p>
        
        <div class="modal__overview">
        <p class="modal__overview-title">About</p>
        <p class="modal__overview-text">${data.data.overview}</p>
        </div></div>`
}

function closeModal() {
    refs.backdrop.classList.add('is-hidden');
}
