import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'antd';

import queryCleaner from '../../tools/queryCleaner';

import './SearchForm.scss';

export default class SearchForm extends Component {
    onChange = (event) => {
        const { changeQuery } = this.props;
        return changeQuery(queryCleaner(event.target.value))
    };

    render() {
        return (
            <form className="header__search-form" onSubmit={(event) => event.preventDefault()}>
                <Input size="large" placeholder="Type to search..." allowClear onChange={debounce(this.onChange, 1000, { maxWait: 1000 })} />
            </form>
        );
    }
}

SearchForm.defaultProps = {
    changeQuery: null,
};

SearchForm.propTypes = {
    changeQuery: PropTypes.func,
};
