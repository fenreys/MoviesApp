/* eslint-disable import/prefer-default-export */
import moviesService from '../services/MoviesService';

export const rateMovie = async (sessionId, movieId, rating) => {
    if (rating === 0) {
        await moviesService.delDeleteRating(sessionId, movieId).catch();
    } else {
        await moviesService.postRateMovie(sessionId, movieId, rating).catch();
    }
};