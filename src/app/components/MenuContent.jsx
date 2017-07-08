import React from 'react';
import PropTypes from 'prop-types';
import AddDishModal from './modals/AddDishModal';
import DishList from './DishList';

const MenuContent = ({ dishes }) => (
    <div id="menu-content" className="menu-content">
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
};

export default MenuContent;
