import React from 'react';
import PropTypes from 'prop-types';
import CategoryList from './CategoryList';

const SideBar = ({ categories, onCategoryEdit, sidebarStyle }) => {
    const { wrapperStyle, isEditingCategory } = sidebarStyle;

    return (
        <div id="sidebar" className="sidebar-wrapper" style={wrapperStyle}>
            <div className="sidebar-content">
                <div className="sidebar-header">
                    Category
                </div>
                <ul className="sidebar-nav list-unstyled">
                    <CategoryList categories={categories} isEditingCategory={isEditingCategory} />
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
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    onCategoryEdit: PropTypes.func.isRequired,
    sidebarStyle: PropTypes.shape({
        isWrapperHidden: PropTypes.bool.isRequired,
        wrapperStyle: PropTypes.object,
        isEditingCategory: PropTypes.bool.isRequired,
        navStyle: PropTypes.object,
    }).isRequired,
};

export default SideBar;
