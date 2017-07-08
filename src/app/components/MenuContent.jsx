import React from 'react';
import PropTypes from 'prop-types';
import MenuContentTitle from './MenuContentTitle';
import DishList from './DishList';
import AddDishModal from './modals/AddDishModal';

const MenuContent = ({ dishes, categoryName }) => (
    <div id="menu-content" className="menu-content">
        <MenuContentTitle
          categoryName={categoryName}
          numOfDishes={Object.keys(dishes).length}
        />
        <DishList dishes={dishes} />
        <AddDishModal />
    </div>
);

MenuContent.propTypes = {
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

export default MenuContent;
