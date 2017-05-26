import React from 'react';
import PropTypes from 'prop-types';

const SideBar = props => (
    <div id="sidebar" className="sidebar-wrapper" style={props.sidebarStyle}>
        <ul className="sidebar-nav">
            {props.categories}
        </ul>
    </div>
);

SideBar.propTypes = {
    sidebarStyle: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
};

export default SideBar;
