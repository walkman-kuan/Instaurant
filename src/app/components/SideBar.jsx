import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CategoryList from './CategoryList';
import AddCategoryButton from './AddCategoryButton';

const SideBar = ({ categories, onEditingCategories, sidebarStyle }) => {
    const { isEditingCategories, isSidebarVisibleOnMobile } = sidebarStyle;
    const sidebarClass = classNames('sidebar-wrapper', { 'sidebar-mobile': isSidebarVisibleOnMobile });
    const showCategoryInfo = Object.keys(categories).length > 0;
    const sidebarContentClass = classNames('sidebar-content', { 'with-edit-categories': showCategoryInfo });

    return (
        <div id="sidebar" className={sidebarClass}>
            <div className={sidebarContentClass}>
                <div className="sidebar-header">
                    Category
                </div>
                {/* Show category-related information only when there are configured categories */}
                {showCategoryInfo &&
                    <CategoryList categories={categories} isEditingCategories={isEditingCategories} />
                }
            </div>
            <AddCategoryButton />
            {/* Edit Category Button */}
            {showCategoryInfo && (
                <button type="button" className="sidebar-footer non-shadow-outlline" onClick={onEditingCategories}>
                    {isEditingCategories ? (
                        <span><span className="glyphicon glyphicon-saved" />&nbsp;Complete editing</span>
                    ) : (
                        <span><span className="glyphicon glyphicon-edit" />&nbsp;Edit categories</span>
                    )}
                </button>
            )}
        </div>
    );
};

SideBar.propTypes = {
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    onEditingCategories: PropTypes.func.isRequired,
    sidebarStyle: PropTypes.shape({
        isSidebarVisibleOnMobile: PropTypes.bool.isRequired,
        isEditingCategories: PropTypes.bool.isRequired,
    }).isRequired,
};

export default SideBar;
