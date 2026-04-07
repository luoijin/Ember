// services/api.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.error("TMDB API key is missing! Check your .env file");
}

const fetchMovies = async (endpoint) => {
  const res = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const data = await res.json();
  return data.results;
};

export const getPopularMovies = () => fetchMovies("popular");
export const getTopRated = () => fetchMovies("top_rated");
export const getNowPlaying = () => fetchMovies("now_playing");
export const getUpcoming = () => fetchMovies("upcoming");