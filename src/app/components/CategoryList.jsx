import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

const CategoryList = ({ categories, isEditingCategories, onConfiguringCategory }) => (
    <ul className="sidebar-nav list-unstyled">
        {Object.values(categories).map(category =>
            <Category
              key={category.id}
              isEditingCategories={isEditingCategories}
              onConfiguringCategory={onConfiguringCategory}
              {...category}
            />)
        }
    </ul>
);

CategoryList.propTypes = {
    // A object of property values of a category shape
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    isEditingCategories: PropTypes.bool.isRequired,
    onConfiguringCategory: PropTypes.func.isRequired,
};

export default CategoryList;
