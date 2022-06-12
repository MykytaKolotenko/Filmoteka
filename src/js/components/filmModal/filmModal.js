const refs = {

    filmCardRef: document.querySelector('.film__card'),
    
}

refs.filmCardRef.addEventListener('click', onOpenFilmCard);

function onOpenFilmCard(evt) {
    evt.preventDefault;
    document.body.classList.add('show__modal');
}