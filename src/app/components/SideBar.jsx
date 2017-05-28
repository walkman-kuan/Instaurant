import React from 'react';
import PropTypes from 'prop-types';

const SideBar = props => (
    <div id="sidebar" className="sidebar-wrapper" style={props.sidebarStyle}>
        <div className="sidebar-content">
            <div className="sidebar-header">
                Category
            </div>
            <ul className="sidebar-nav list-unstyled">
                {props.categories}
            </ul>
        </div>
        <div className="sidebar-footer">
            <span className="glyphicon glyphicon-edit" />&nbsp;Edit categories
        </div>
    </div>
);

SideBar.propTypes = {
    sidebarStyle: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
};

export default SideBar;
