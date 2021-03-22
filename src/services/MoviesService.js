/* eslint-disable no-underscore-dangle */
import { apiBase, apiKey, apiLanguage, get, post, del } from './MoviesServiceConstants';

export default class MoviesService {
    startSession = async () => {
        const res = await fetch(`${apiBase}${get.createGuestSession}?${apiKey}`);
        const body = await res.json();
        return body;
    };

    getGenres = async () => {
        const res = await fetch(`${apiBase}${get.getMovieList}?${apiKey}&${apiLanguage}`);
        const body = await res.json();
        return body;
    };

    getMovies = async (query, page, sessionId) => {
        const url = () => {
            if (!sessionId) {
                if (query === '') {
                    return `${apiBase}${get.getTopRated}?${apiKey}&${apiLanguage}&page=${page}`
                }
                return `${apiBase}${get.searchMovies}?${apiKey}&${apiLanguage}&query=${query}&page=${page}&include_adult=false`
            }
            return `${apiBase}${get.getRatedMovies(sessionId)}?${apiKey}&${apiLanguage}&sort_by=created_at.asc`
        }
        const res = await fetch(url());
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
