import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'antd';

import './Footer.scss';

export default class Footer extends Component {
    onChange = (page) => {
        const { changePage } = this.props;
        changePage(page);
    };

    render() {
        const { currentPage, totalPages } = this.props;
        return (
            <div className="footer">
                <Pagination current={currentPage} onChange={this.onChange} simple={document.documentElement.scrollWidth < 375} showSizeChanger={false} total={totalPages} />
            </div>
        );
    }
}

Footer.defaultProps = {
    currentPage: 1,
    totalPages: 1,
    changePage: null,
};
Footer.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    changePage: PropTypes.func,
};
