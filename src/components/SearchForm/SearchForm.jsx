import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

import './SearchForm.scss';

export default class SearchForm extends Component {
    state = {
        text: ''
    };

    onChange = (event) => {
        this.setState(() => ({ text: event.target.value }));
    };

    onSubmit = (event) => {
        const { changeQuery } = this.props;
        event.preventDefault();
        const { text } = this.state;
        if (!text) return;
        changeQuery(text);
    };

    render() {
        const { text } = this.state;
        const { isHidden } = this.props;
        return (
            <form className={`search-form ${isHidden}`} onSubmit={this.onSubmit}>
                <Input size="large" placeholder="Type to search..." allowClear onChange={this.onChange} value={text} />
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
