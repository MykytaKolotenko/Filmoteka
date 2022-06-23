import axios from 'axios';

// main keys and url

const KEYv3 = '?api_key=0f5c4a68ea4f6f8af4c4fd53fcc81027';
const URL = `
https://api.themoviedb.org/3`;
const URLImage = 'https://image.tmdb.org/t/p/w300';

// options

const trendingMovies = `/trending/movie/week`;
const searchingMovie = `/search/movie`;
const movie = `/movie/`;
const movieWithGenres = `/discover/movie`;

// query and pagination

const pagination = pageNumber => `&&page=${pageNumber}`;
const query = (inputText, pageNumber) =>
  `&&query=${inputText}` + `&&page=${pageNumber}`;
const withGenres = genreId => `&&with_genres=${genreId}`;

// Links

export const urlTrendingMovies = (pageNumber = 1) =>
  URL + trendingMovies + KEYv3 + pagination(pageNumber);
const urlSearchingMovie = (inputText, pageNumber = 1) =>
  URL + searchingMovie + KEYv3 + query(inputText, pageNumber);
const urlMovie = id => URL + movie + id + KEYv3;
const urlFilteringMovieByGenre = (genreId, pageNumber) =>
  URL + movieWithGenres + KEYv3 + withGenres(genreId) + pagination(pageNumber);

// Fetching functions

export const getTrendingMovies = async (pageNumber = 1) =>
  await axios.get(urlTrendingMovies(pageNumber));
export const getSearchingMovie = async (inputText, pageNumber = 1) =>
  await axios.get(urlSearchingMovie(inputText, pageNumber));
export const getMovie = async id => await axios.get(urlMovie(id));
export const getImage = imagePath => URLImage + imagePath + KEYv3;
export const getFilteringMovieByGenre = async (genreIds, pageNumber = 1) =>
  await axios.get(urlFilteringMovieByGenre(genreIds, pageNumber));
