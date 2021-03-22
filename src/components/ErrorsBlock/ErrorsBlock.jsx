import React from 'react';
import PropTypes from 'prop-types'

import './ErrorsBlock.scss';

export const GotTrouble = () => (
    <div className="got-trouble">
        <p>Brah, we got awful troubles</p>
    </div>
);

export const NoGenres = () => (
    <div className="no-content">
        <p>Sorry, i dunno how fix it</p>
        <p>Just reset page one time :c</p>
    </div>
)

export const NoContent = ({ tab }) => {
    if (tab) {
        return (
            <div className="no-content">
                <p>Nothing was found for your request :c</p>
                <p>Try to search something other!</p>
            </div>
        )
    }
    return (
        <div className="no-content">
            <p>U will definitely see a movies</p>
            <p>Just rate any!</p>
        </div>
    )
};

NoContent.defaultProps = {
    tab: true,
}

NoContent.propTypes = {
    tab: PropTypes.bool,
}