/* eslint-disable import/prefer-default-export */
import MoviesService from '../services/MoviesService';

const moviesService = new MoviesService;

export const rateMovie = async (sessionId, movieId, rating) => {
    if (rating === 0) {
        await moviesService.delDeleteRating(sessionId, movieId).catch();
    } else {
        await moviesService.postRateMovie(sessionId, movieId, rating).catch();
    }
};