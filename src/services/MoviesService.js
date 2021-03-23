import { apiBase, apiKey, apiLanguage, get, post, del } from './MoviesServiceConstants';

class MoviesService {
    getSession = async () => {
        const res = await fetch(`${apiBase}${get.createGuestSession}?${apiKey}`);
        const body = await res.json();
        return body;
    };

    getGenres = async () => {
        const res = await fetch(`${apiBase}${get.getMovieList}?${apiKey}&${apiLanguage}`);
        const body = await res.json();
        return body;
    };

    getTopRated = async (page) => {
        const res = await fetch(`${apiBase}${get.getTopRated}?${apiKey}&${apiLanguage}&page=${page}`);
        const body = await res.json();
        return body;
    }
    
    getRated = async (sessionId) => {
        const res = await fetch(`${apiBase}${get.getRatedMovies(sessionId)}?${apiKey}&${apiLanguage}&sort_by=created_at.asc`);
        const body = await res.json();
        return body;        
    }

    getSearched = async (query, page) => {
        const res = await fetch(`${apiBase}${get.searchMovies}?${apiKey}&${apiLanguage}&query=${query}&page=${page}&include_adult=false`)
        const body = await res.json();
        return body;
    };

    postRateMovie = async (sessionId, movieId, rating) => {
        const res = await fetch(`${apiBase}${post.rateMovie(movieId)}?${apiKey}&guest_session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                value: rating,
            }),
        });
        const body = await res.json();
        return body;
    };

    delDeleteRating = async (sessionId, movieId) => {
        const res = await fetch(`${apiBase}${del.deleteRating(movieId)}?${apiKey}&guest_session_id=${sessionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
        const body = await res.json();
        return body;
    };
}

const moviesService = new MoviesService();

export default moviesService 