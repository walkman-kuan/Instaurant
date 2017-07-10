import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuContentTitle from './MenuContentTitle';
import DishList from './DishList';
import AddDishModal from './modals/AddDishModal';
import RemoveDishModal from './modals/RemoveDishModal';

const MenuContent = ({ dishes, categoryName, isSidebarVisibleOnMobile }) => {
    const menuContentClass = classNames('menu-content', { 'push-dishes-left': isSidebarVisibleOnMobile });

    return (
        <div id="menu-content" className={menuContentClass}>
            <MenuContentTitle
              categoryName={categoryName}
              numOfDishes={Object.keys(dishes).length}
            />
            <DishList dishes={dishes} />
            <AddDishModal />
            <RemoveDishModal />
        </div>
    );
};

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
    isSidebarVisibleOnMobile: PropTypes.bool.isRequired,
};

export default MenuContent;
