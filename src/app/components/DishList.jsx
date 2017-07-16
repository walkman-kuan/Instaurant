import React from 'react';
import PropTypes from 'prop-types';
import Dish from './Dish';
import AddDishThumbnail from './AddDishThumbnail';

const DishList = ({ dishes, categoryName }) => (
    <div className="row">
        {Object.values(dishes).map(dish => (
            <Dish
              key={dish.id}
              {...dish}
            />
        ))}
        {/* Render AddDishThumbnail only when 'categoryName' is truthy, i.e., 'configuredCategoryId' is truthy */}
        { categoryName && <AddDishThumbnail /> }
    </div>
);


DishList.propTypes = {
    dishes: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    categoryName: PropTypes.string.isRequired,
};

export default DishList;
