import React from 'react';
import PropTypes from 'prop-types';

import Movie from '../Movie';

import './MoviesList.scss';

const MoviesList = ({ tabSearch, movies, ratedNotes, rateMovie }) => (
        <div className="movies-list">
        {movies.map(
            ({
                id,
                poster_path: posterPath,
                title,
                vote_average: voteAverage,
                release_date: releaseDate,
                genre_ids: genreIds,
                overview,
                rating,
            }) => {
                const defaultRating = ()=> {
                    if (tabSearch && ratedNotes) {
                        const filtredNotes = ratedNotes.filter(note => note.id === id);
                        if (filtredNotes.length) {
                            return filtredNotes[0].rating
                        }
                        return 0
                    }
                    return rating;
                };
                return (
                    <Movie
                        key={id}
                        posterPath={posterPath}
                        title={title}
                        voteAverage={voteAverage}
                        releaseDate={releaseDate}
                        genreIds={genreIds}
                        overview={overview}
                        rating={defaultRating()}
                        rateMovie={(value) => rateMovie(id, value)}
                    />
                );
            }
        )}
        </div>
)

export default MoviesList

MoviesList.defaultProps = {
    tabSearch: true,
    movies: [],
    ratedNotes: [],
    rateMovie: null,
};

MoviesList.propTypes = {
    tabSearch: PropTypes.bool,
    movies: PropTypes.instanceOf(Array),
    ratedNotes: PropTypes.instanceOf(Array),
    rateMovie: PropTypes.func,
};
