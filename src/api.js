import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
      api_key: "5d7dc545b99fe2abed134b1d6f103064",
      language: "en-US"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular")
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today")
}