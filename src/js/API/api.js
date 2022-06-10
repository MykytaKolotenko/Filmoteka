import axios from 'axios';

// main keys and url

const KEYv3 = '?api_key=0f5c4a68ea4f6f8af4c4fd53fcc81027';
const URL = `
https://api.themoviedb.org/3/`;

// options

const trendingMovies = `trending/movie/week`;
const searchingMovie = `search/movie`;
const movie = `/movie/`;

// query and pagination

const pagination = pageNumber => `&&page=${pageNumber}`;
const query = inputText => `&&query=${inputText}`;

// Links

const urlTrendingMovies = pageNumber =>
  URL + trendingMovies + KEYv3 + pagination(pageNumber);
const urlSearchingMovie = inputText =>
  URL + searchingMovie + KEYv3 + query(inputText);
const urlMovie = id => URL + movie + id + KEYv3;

// Fetching functions

export const getTrendingMovies = async (pageNumber = 1) =>
  await axios.get(urlTrendingMovies(pageNumber));
export const getSearchingMovie = async inputText =>
  await axios.get(urlSearchingMovie(inputText));
export const getMovie = async id => await axios.get(urlMovie(id));
