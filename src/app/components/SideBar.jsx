import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CategoryList from './CategoryList';
import AddCategoryButton from './AddCategoryButton';
import EditCategoryButton from './EditCategoryButton';

const SideBar = ({ categories, onConfiguringCategory, onEditingCategories, sidebarStyle }) => {
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
                    <CategoryList
                      categories={categories}
                      isEditingCategories={isEditingCategories}
                      onConfiguringCategory={onConfiguringCategory}
                    />
                }
            </div>

            <AddCategoryButton />
            {showCategoryInfo &&
                <EditCategoryButton
                  isEditingCategories={isEditingCategories}
                  onEditingCategories={onEditingCategories}
                />
            }
        </div>
    );
};

SideBar.propTypes = {
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    onConfiguringCategory: PropTypes.func.isRequired,
    onEditingCategories: PropTypes.func.isRequired,
    sidebarStyle: PropTypes.shape({
        isSidebarVisibleOnMobile: PropTypes.bool.isRequired,
        isEditingCategories: PropTypes.bool.isRequired,
    }).isRequired,
};

export default SideBar;
