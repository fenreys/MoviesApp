import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Movie from '../../components/Movie';

import './MoviesContainer.scss';

export default class MoviesContainer extends Component {
    state = {};

    getMovies = () => {
        const { tabSearch, movies, ratedNotes, rateMovie } = this.props;
        return movies.map(
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
                    if (tabSearch) {
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
        );
    };

    render() {
        return <div className="movies-сontainer">{this.getMovies()}</div>;
    }
}

MoviesContainer.defaultProps = {
    tabSearch: true,
    movies: [],
    ratedNotes: [],
    rateMovie: null,
};

MoviesContainer.propTypes = {
    tabSearch: PropTypes.bool,
    movies: PropTypes.instanceOf(Array),
    ratedNotes: PropTypes.instanceOf(Array),
    rateMovie: PropTypes.func,
};
