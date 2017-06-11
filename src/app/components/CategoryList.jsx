import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

const CategoryList = ({ categories, isEditingCategory }) => (
    <ul className="sidebar-nav list-unstyled">
        {Object.values(categories).map(category =>
            <Category
              key={category.id}
              isEditingCategory={isEditingCategory}
              {...category}
            />)
        }
    </ul>
);

CategoryList.propTypes = {
    // A object of property values of an catgory shape
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    isEditingCategory: PropTypes.bool.isRequired,
};

export default CategoryList;
