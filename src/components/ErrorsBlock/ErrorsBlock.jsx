import React from 'react';
import PropTypes from 'prop-types'

import './ErrorsBlock.scss';

export const GotTrouble = () => (
    <div className="got-trouble">
        <p>Brah, we got awful troubles</p>
    </div>
);

export const NoContent = ({ tabSearch }) => {
    if (tabSearch) {
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
    tabSearch: true,
}

NoContent.propTypes = {
    tabSearch: PropTypes.bool,
}