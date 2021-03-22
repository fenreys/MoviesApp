/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { Rate } from 'antd';

import { GenresConsumer } from '../GenresContext/GenresContext';
import { movieModifier, voteModifier } from './MovieConstants';

import insteadPoster from './insteadPoster.jpg';

import './Movie.scss';

export default class Movie extends Component {
    state = {
        modifier: movieModifier.default,
    };

    setMovieModifier = (value) => {
        this.setState({ modifier: value });
    };

    onChange = (value) => {
        const { rateMovie } = this.props;
        rateMovie(value);
    };

    render() {
        const { modifier } = this.state;
        const { posterPath, title, voteAverage, releaseDate, genreIds, overview, rating } = this.props;
        const poster = posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : insteadPoster;
        const date = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : <span>No date</span>;
        return (
            <article className={`movie ${modifier}`}>
                <div className="poster">
                    <img className="image" src={poster} alt="no img :c" />
                </div>
                <p
                    className="title"
                    onClick={() => {
                        if (modifier === movieModifier.title) {
                            this.setMovieModifier(movieModifier.default)
                        } else if (modifier === movieModifier.default) {
                            this.setMovieModifier(movieModifier.title)
                        }
                    }}
                >
                    {title}
                </p>
                <div className={`vote-average ${voteModifier(voteAverage)}`}>{voteAverage}</div>
                <p className="release-date">{date}</p>
                <GenresConsumer>
                    {(genres, namesArr = []) => {
                        if (genres) {
                            genres.forEach(({ id, name }) => {
                                for (const recId of genreIds) {
                                    if (id === recId) {
                                        namesArr.push(
                                            <span key={id} className="genre">
                                                {name}
                                            </span>
                                        );
                                    }
                                }
                            });
                            return (
                                <div
                                    className="genres"
                                    onClick={() => {
                                        if (modifier === movieModifier.genres) {
                                            this.setMovieModifier(movieModifier.default)
                                        } else if (modifier === movieModifier.default) {
                                            this.setMovieModifier(movieModifier.genres)
                                        }
                                    }}
                                >
                                    {namesArr}
                                </div>
                            );
                        }
                        return <div className="genres">just reset page one time</div>
                    }}
                </GenresConsumer>
                <p className="overview">
                    {overview.length > 230 ? `${overview.slice(0, overview.lastIndexOf(' ', 230))} ...` : overview}
                </p>
                <Rate className="rate" onChange={this.onChange} allowClear allowHalf defaultValue={rating} count={10} />
            </article>
        );
    }
}

Movie.defaultProps = {
    posterPath: null,
    title: null,
    voteAverage: null,
    releaseDate: null,
    genreIds: [],
    overview: null,
    rating: null,
    rateMovie: () => {},
};

Movie.propTypes = {
    posterPath: PropTypes.string,
    title: PropTypes.string,
    voteAverage: PropTypes.number,
    releaseDate: PropTypes.string,
    genreIds: PropTypes.instanceOf(Array),
    overview: PropTypes.string,
    rating: PropTypes.number,
    rateMovie: PropTypes.func,
};
