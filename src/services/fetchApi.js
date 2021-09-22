import axios from "axios";
import { apiKey } from "../constants";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const fetchTrendingMovies = async () => {
  const queryString = `trending/movie/day${apiKey}`;

  const { data: movies } = await axios.get(queryString);

  return movies;
};

export const searchMovies = async (stringToSearch) => {
  const queryString = `search/movie${apiKey}&language=en-US&page=1&include_adult=false&query=${stringToSearch}`;

  const { data: movies } = await axios.get(queryString);

  return movies;
};

export const getMovieDetails = async (movieId) => {
  const queryString = `movie/${movieId}${apiKey}&language=en-US`;

  const { data: movie } = await axios.get(queryString);

  return movie;
};

export const getMovieCast = async (movieId) => {
  const queryString = `movie/${movieId}/credits${apiKey}&language=en-US`;

  const { data } = await axios.get(queryString);

  return data;
};

export const getReviews = async (movieId) => {
  const queryString = `movie/${movieId}/reviews${apiKey}&language=en-US`;

  const { data } = await axios.get(queryString);

  return data;
};
