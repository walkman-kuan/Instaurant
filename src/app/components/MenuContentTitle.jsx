import React from 'react';
import PropTypes from 'prop-types';

const MenuContentTitle = ({ categoryName, numOfDishes }) => (
    <h3 className="menu-content-title">
        {categoryName}&nbsp;<span>({numOfDishes})</span>
    </h3>
);

MenuContentTitle.propTypes = {
    categoryName: PropTypes.string.isRequired,
    numOfDishes: PropTypes.number.isRequired,
};

export default MenuContentTitle;
