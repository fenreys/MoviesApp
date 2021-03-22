import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'antd';

import './SearchForm.scss';

export default class SearchForm extends Component {
    onChange = (event) => {
        const { changeQuery } = this.props;
        const text = event.target.value;
        return text ? changeQuery(text) : changeQuery('return')
    };

    render() {
        const { isHidden } = this.props;
        return (
            <form className={`search-form ${isHidden}`} onSubmit={(event) => event.preventDefault()}>
                <Input size="large" placeholder="Type to search..." allowClear onChange={debounce(this.onChange, 1000, { maxWait: 1000 })} />
            </form>
        );
    }
}

SearchForm.defaultProps = {
    isHidden: '',
    changeQuery: null,
};

SearchForm.propTypes = {
    isHidden: PropTypes.string,
    changeQuery: PropTypes.func,
};
