import React, { Component } from 'react';

import { Spin } from 'antd';

import { GotTrouble, NoContent } from '../../components/ErrorsBlock';

import moviesService from '../../services/MoviesService';
import { rateMovie } from '../../tools/rateMovie';

import Header from '../../components/Header';
import MoviesList from '../../components/MoviesList';
import { GenresProvider } from '../../components/GenresContext/GenresContext';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';
import './MoviesApp.scss';

export default class MoviesApp extends Component {
    state = {
        tabSearch: true,
        tabRated: false,
        currentPage: 1,
        currentQuery: '',
        movies: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.setState(() => ({ session: JSON.parse(localStorage.getItem('session')) }));
        this.setState(() => ({ genres: JSON.parse(localStorage.getItem('genres')) }));
        this.setState(() => ({ ratedNotes: JSON.parse(localStorage.getItem('ratedNotes')) }));
        this.updateMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            const { tabSearch, currentPage, currentQuery } = this.state;
            if (tabSearch !== prevState.tabSearch || currentPage !== prevState.currentPage || currentQuery !== prevState.currentQuery) {
                this.updateMovies();
            }
        }
    }

    startApp = async () => {
        if (!localStorage.getItem('session')) {
            await moviesService
                .getSession()
                .then((guestSession) => localStorage.setItem('session', JSON.stringify(guestSession)))
                .catch(() => this.onError());
        }
        if (!localStorage.getItem('genres')) {
            await moviesService
                .getGenres()
                .then((receivedGenres) => {
                    const genersObj = {};
                    // eslint-disable-next-line no-return-assign
                    receivedGenres.genres.forEach(({id, name}) => genersObj[id] = name);
                    localStorage.setItem('genres', JSON.stringify(genersObj))
                })
                .catch(() => this.onError());
        }
        window.location.reload()
    }

    updateMovies = async () => {
        const { session, tabSearch, currentQuery, currentPage } = this.state;

        this.setState(() => ({ loading: true }));
        if (tabSearch && session) {
            await moviesService
                .getRated(session.guest_session_id)
                .then((res, arr=[]) => {
                    res.results.forEach(({id, rating}) => arr.push({id, rating}))
                    localStorage.setItem('ratedNotes', JSON.stringify(arr))
                    this.setState(() => ({ ratedNotes: JSON.parse(localStorage.getItem('ratedNotes')) }))
                })
                .catch(() => this.onError())
        }
        if (tabSearch && !currentQuery) {
            await moviesService
                .getTopRated(currentPage)
                .then((res) => {
                    this.setState(() => ({ movies: res.results, totalPages: res.total_pages }));
                })
                .catch(() => this.onError())
        }
        if (tabSearch && currentQuery && currentPage) {
            await moviesService
                .getSearched(currentQuery, currentPage)
                .then((res) => {
                    this.setState(() => ({ movies: res.results, totalPages: res.total_pages }));
                })
                .catch(() => this.onError())
        }
        if (!tabSearch) {
            await moviesService
                .getRated(session.guest_session_id)
                .then((res) => {
                    this.setState(() => ({ movies: res.results, totalPages: res.total_pages }));
                })
                .catch(() => this.onError())
        }
        this.setState(() => ({ loading: false }));
    };

    changeTab = () => {
        this.setState(({tabSearch, tabRated}) => ({ tabSearch: !tabSearch, tabRated: !tabRated }));
    };

    changeQuery = (newValue) => {
        this.setState(() =>({ currentQuery: newValue, currentPage: 1 }));
    };

    changePage = (newValue) => {
        this.setState(() => ({ currentPage: newValue }));
    };

    onError = () => {
        this.setState(() => ({ loading: false, error: true }));
    };

    render() {
        const { session, genres, tabSearch, tabRated, movies, ratedNotes, currentPage, totalPages, loading, error } = this.state;

        const preparing = loading || error;
        
        const moviesList = movies.length !== 0 ? (
            <GenresProvider value={genres}>
                <MoviesList
                    tab={tabSearch}
                    movies={movies}
                    ratedNotes={ratedNotes}
                    rateMovie={(movieId, value) => rateMovie(session.guest_session_id, movieId, value)}
                />
            </GenresProvider>
        ) : (
            <NoContent tab={tabSearch}/>
        );

        const footerBlock = (totalPages && totalPages !== 0) && 
            <Footer totalPages={totalPages} currentPage={currentPage} changePage={this.changePage} />

        const app = session && genres ? (
            <>
                <Header tabSearch={tabSearch} tabRated={tabRated} changeTab={this.changeTab} changeQuery={this.changeQuery} />
                {error && <GotTrouble />}
                {loading && <Spin size="large" />}
                {!preparing && <>{moviesList} {footerBlock}</>}
            </>
        ) : (
            <button className="movies-app__start" type="button" onClick={() => this.startApp()}>Tap to start!</button>
        );

        return (
            <section className="movies-app">
                {app}
            </section>
        );
    }
}
