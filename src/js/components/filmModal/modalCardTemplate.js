const modalCardTemplate = (
    movieImage,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    movieGenres,
    overview,
    watchedClassButtonOrange,
    watchedBtnDisabled,
    watchedBtnText,
    queueClassButtonOrange,
    queueBtnDisabled,
    queueBtnText
) => {
    return `<div class="modal__image-wrapper">
        <img src=${movieImage} class="modal__image" >
        </div>
        <div class="modal__content">
        <h2 class="modal__title">${title}</h2>
        <div class="modal__film-info">
        <div class="film-info__wrapp">
        <p class="film-info__property">Vote / Votes</p>
        <div class="film-info__value">
        <div class="film-info__value--orange">${vote_average}</div>
        <div class="film-info__value--slash"> / </div>
        <div class="film-info__value--grey">${vote_count}</div>
        </div>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Popularity</p>
        <p class="film-info__value">${popularity}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Original Title</p>
        <p class="film-info__value film-info__value--big">${original_title}</p>
        </div>
        <div class="film-info__wrapp">
        <p class="film-info__property">Genre</p>
        <p class="film-info__value">${movieGenres}</p>
        </div>
        </div>
        <div class="modal__overview">
        <p class="overview__title">About</p>
        <p class="overview__text">${overview}</p>
        </div>
        <div class="modal__buttons">
        <button class="button ${watchedClassButtonOrange}" id="watched" ${watchedBtnDisabled}>${watchedBtnText}</button>
        <button class="button ${queueClassButtonOrange}" id="queue" ${queueBtnDisabled}>${queueBtnText}</button>
        </div>
        </div>`;
}

export default modalCardTemplate;