export const apiBase = 'https://api.themoviedb.org/3';
export const apiKey = 'api_key=74d0af3012078dffc9d5c997064a1756';
export const apiLanguage = 'language=en-US';

export const get = {
    createGuestSession: '/authentication/guest_session/new',
    searchMovies: '/search/movie',
    getTopRated: '/movie/top_rated',
    getRatedMovies: (guestSessionId) => `/guest_session/${guestSessionId}/rated/movies`,
    getMovieList: '/genre/movie/list',
};

export const post = {
    rateMovie: (movieId) => `/movie/${movieId}/rating`,
};

export const del = {
    deleteRating: (movieId) => `/movie/${movieId}/rating`,
};
