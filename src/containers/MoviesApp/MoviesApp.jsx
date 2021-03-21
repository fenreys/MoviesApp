import React, { Component } from 'react';

import { Spin } from 'antd';

import { GotTrouble, NoContent } from '../../components/ErrorsBlock';

import MoviesService from '../../services/MoviesService';
import { rateMovie } from '../../tools/rateMovie';

import Header from '../../components/Header';
import MoviesContainer from '../MoviesContainer';
import { GenresProvider } from '../../components/GenresContext/GenresContext';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';
import './MoviesApp.scss';

export default class MoviesApp extends Component {
    moviesService = new MoviesService();

    state = {
        session: JSON.parse(localStorage.getItem('session')),
        genres: JSON.parse(localStorage.getItem('genres')),
        tabSearch: true,
        tabRated: false,
        currentPage: 1,
        currentQuery: 'return',
        movies: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.startSession();
        this.getGenres();
        this.updateMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        const { tabSearch, currentPage, currentQuery } = this.state;
        if (tabSearch !== prevState.tabSearch || currentPage !== prevState.currentPage || currentQuery !== prevState.currentQuery) {
            this.updateMovies();
        }
    }

    startSession = async () => {
        const { session } = this.state;
        if (!session) {
            await this.movieService
                .startSession()
                .then((guestSession) => localStorage.setItem('session', JSON.stringify(guestSession)))
                .catch();
        }
    };

    getGenres = async () => {
        const { genres } = this.state;
        if (!genres) {
            await this.movieService
                .getGenres()
                .then((receivedGenres) => localStorage.setItem('genres', JSON.stringify(receivedGenres.genres)))
                .catch();
        }
    };

    updateMovies = async () => {
        const { session, tabSearch, currentQuery, currentPage } = this.state;
        const options =
            tabSearch ? [currentQuery, currentPage] : [undefined, undefined, session.guest_session_id];

        this.setState({ loading: true });
        await this.moviesService
            .getMovies(undefined, undefined, session.guest_session_id)
            .then((res, arr=[]) => {
                res.results.forEach(({id, rating}) => arr.push({id, rating}))
                localStorage.setItem('ratedNotes', JSON.stringify(arr))
            })
        this.setState({ ratedNotes: JSON.parse(localStorage.getItem('ratedNotes')) })
        await this.moviesService
            .getMovies(...options)
            .then((res) => {
                this.setState({ movies: res.results, totalPages: res.total_pages });
            })
            .catch(() => this.onError());
        this.setState({ loading: false });
    };

    changeTab = () => {
        this.setState(({tabSearch, tabRated}) => ({ tabSearch: !tabSearch, tabRated: !tabRated }));
    };

    changeQuery = (newValue) => {
        this.setState({ currentQuery: newValue, currentPage: 1 });
    };

    changePage = (newValue) => {
        this.setState({ currentPage: newValue });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    render() {
        const { session, genres, tabSearch, tabRated, movies, ratedNotes, currentPage, totalPages, loading, error } = this.state;

        const preparing = loading || error;

        const errorBlock = error ? <GotTrouble /> : null;
        const spin = loading ? <Spin size="large" /> : null;

        const moviesBlock = movies.length !== 0 ? (
            <GenresProvider value={genres}>
                <MoviesContainer
                    tab={tabSearch}
                    movies={movies}
                    ratedNotes={ratedNotes}
                    rateMovie={(movieId, value) => rateMovie(session.guest_session_id, movieId, value)}
                />
            </GenresProvider>
        ) : (
            <NoContent tab={tabSearch}/>
        );
        const footerBlock =
            totalPages && totalPages !== (0 || 1) ? (
                <Footer totalPages={totalPages} currentPage={currentPage} changePage={this.changePage} />
            ) : null;

        const content = !preparing ? (
            <>
                {moviesBlock}
                {footerBlock}
            </>
        ) : null;

        return (
            <section className="movies-app">
                <Header tabSearch={tabSearch} tabRated={tabRated} changeTab={this.changeTab} changeQuery={this.changeQuery} />
                {errorBlock}
                {spin}
                {content}
            </section>
        );
    }
}
