import React from 'react';
import PropTypes from 'prop-types';

import { isSearch, isRated, isHidden } from './HeaderConstants';
import SearchForm from '../SearchForm';

import './Header.scss';

const Header = ({ tabSearch, tabRated, changeTab, changeQuery }) => (
    <div className="header">
        <div className="header__buttons">
            <button
                className={isSearch(tabSearch)}
                type="button"
                onClick={tabRated ? () => changeTab() : null}
            >
                Search
            </button>
            <button
                className={isRated(tabRated)}
                type="button"
                onClick={tabSearch ? () => changeTab() : null}
            >
                Rated
            </button>
        </div>
        <SearchForm isHidden={isHidden(tabRated)} changeQuery={changeQuery} />
    </div>
);

Header.defaultProps = {
    tabSearch: true,
    tabRated: false,
    changeTab: null,
    changeQuery: null,
};

Header.propTypes = {
    tabSearch: PropTypes.bool,
    tabRated: PropTypes.bool,
    changeTab: PropTypes.func,
    changeQuery: PropTypes.func,
};

export default Header;
