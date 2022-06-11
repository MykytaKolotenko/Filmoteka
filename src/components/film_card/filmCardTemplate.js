export default filmCardTemplate = (
  image = 'https://thumbs.dreamstime.com/b/mission-failed-text-written-red-round-vintage-rubber-stamp-mission-failed-text-written-red-vintage-round-stamp-214766654.jpg',
  filmName = 'Check',
  genresOfFilm = ' Failed to load',
  year = '2021',
  id = 'Mistake'
) => `<div class="film__card" id="${id}">
      <img
        src="${image}"
        alt="${filmName}"
        class="film__card-poster"
      />

      <p class="film__card-name">${filmName}</p>
      <p class="film__card-genres">${genresOfFilm} | ${year}</p>
    </div>`;
