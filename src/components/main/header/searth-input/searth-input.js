import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {  getSearchingMovie } from '../../../../js/API/api';
import { filmCardTemplate } from '../../../film_card/film_card';
import { mainHeaderTemplate } from '../main_header_template';

const searth = document.querySelector('.main__header-input');
const filmCard = document.querySelector('.film__card');
console.log(filmCard);
// console.log(searth);

const DEBOUNCE_DELAY = 300;

searth.addEventListener('input', debounce(onInputFilm, DEBOUNCE_DELAY));

function onInputFilm() {
    const filmName = searth.value;
    if (filmName === '') {
        filmCard.innerHTML = '';
        return;
    }

    getSearchingMovie(e)
        .then(films => {
        const markup = results.map(film => filmCardTemplate(film));
        filmCard.innerHTML = markup.join('');
            if (films) {
                filmCard.innerHTML = ''; 
                return;
            }
        })
        .catch (error => {
                Notiflix.failure('Oops, there is no film with that name');
                filmCard.innerHTML = '';
                return error;
        });
    }

