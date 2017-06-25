import React from 'react';
import PropTypes from 'prop-types';
import CategoryList from './CategoryList';
import AddCategoryButton from './AddCategoryButton';

const SideBar = ({ categories, onEditingCategories, sidebarStyle }) => {
    const { wrapperStyle, isEditingCategories } = sidebarStyle;
    const showCategoryInfo = Object.keys(categories).length > 0;
    // -90px for both the 'Add category' and 'Edit categories' buttons
    const marginBottom = showCategoryInfo ? { marginBottom: '-90px' } : { marginBottom: '-45px' };

    return (
        <div id="sidebar" className="sidebar-wrapper" style={wrapperStyle}>
            <div className="sidebar-content" style={marginBottom}>
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
        isWrapperHidden: PropTypes.bool.isRequired,
        wrapperStyle: PropTypes.object,
        isEditingCategories: PropTypes.bool.isRequired,
    }).isRequired,
};

export default SideBar;
