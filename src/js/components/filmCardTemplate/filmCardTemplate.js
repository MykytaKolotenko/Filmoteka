const filmCardTemplate = (
  image,
  filmName,
  genresOfFilm,
  year,
  id
) => `<div class="film__card" id="${id}" >
      <img
        src="${image}"
        alt="${filmName}"
        class="film__card-poster"
        width="500"
        height="750"
      />

      <p class="film__card-name">${filmName}</p>
      <p class="film__card-genres">${genresOfFilm} | ${year}</p>
    </div>`;

export default filmCardTemplate;
