import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ categories, onCategoryEdit, sidebarStyle }) => {
    const { wrapperStyle, isEditingCategory } = sidebarStyle;

    return (
        <div id="sidebar" className="sidebar-wrapper" style={wrapperStyle}>
            <div className="sidebar-content">
                <div className="sidebar-header">
                    Category
                </div>
                <ul className="sidebar-nav list-unstyled">
                    {categories}
                </ul>
            </div>
            <button type="button" className="sidebar-footer" onClick={onCategoryEdit}>
                {isEditingCategory ? (
                    <span><span className="glyphicon glyphicon-saved" />&nbsp;Complete editing</span>
                ) : (
                    <span><span className="glyphicon glyphicon-edit" />&nbsp;Edit categories</span>
                )}
            </button>
        </div>
    );
};

SideBar.propTypes = {
    categories: PropTypes.array.isRequired,
    onCategoryEdit: PropTypes.func.isRequired,
    sidebarStyle: PropTypes.object.isRequired,
};

export default SideBar;
