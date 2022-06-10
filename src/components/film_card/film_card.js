export default filmCardTemplate = (
  image = 'https://thumbs.dreamstime.com/b/mission-failed-text-written-red-round-vintage-rubber-stamp-mission-failed-text-written-red-vintage-round-stamp-214766654.jpg',
  title = 'Failed',
  filmName = 'Check',
  genres = ' Failed to load',
  year = '2021'
) => `<div class="film__card">
      <img
        src="${image}"
        alt="${title}"
        class="film__card-poster"
      />

      <p class="film__card-name">${filmName}</p>
      <p class="film__card-genres">${genres} | ${year}</p>
    </div>`;
