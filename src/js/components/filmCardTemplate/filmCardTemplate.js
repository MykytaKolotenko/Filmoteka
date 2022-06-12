const filmCardTemplate = (
  image,
  filmName,
  genresOfFilm,
  year,
  id
) => `<li class="film__card" id="${id}">
      <img
        src="${image}"
        alt="${filmName}"
        class="film__card-poster"
      />

      <p class="film__card-name">${filmName}</p>
      <p class="film__card-genres">${genresOfFilm} | ${year}</p>
    </li>`;

export default filmCardTemplate;
