import InfiniteScroll from 'infinite-scroll';
import { getImage } from '../../../API/api';
import filmCardTemplate from '../../filmCardTemplate/filmCardTemplate';
import genresData from './genresFromId';

export default function infinityPagination() {
  const options = {
    path: function () {
      let pageNumber = this.loadCount + 1;
      return `https://api.themoviedb.org/3/trending/movie/week?api_key=0f5c4a68ea4f6f8af4c4fd53fcc81027&&page=${
        pageNumber + 1
      }`;
    },
    responseBody: 'json',
    history: false,
  };

  let infScroll = new InfiniteScroll('.container', options);

  infScroll.on('load', function (body) {
    const { results } = body;
    const template = results
      .map(({ poster_path, original_title, id, genre_ids, release_date }) => {
        const wordGenres = genresData(genre_ids);
        console.log(wordGenres);
        const date = release_date.slice(0, 4);
        const image = getImage(poster_path);

        return filmCardTemplate(image, original_title, wordGenres, date, id);
      })
      .join('');


