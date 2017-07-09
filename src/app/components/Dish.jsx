import React from 'react';
import PropTypes from 'prop-types';

const Dish = ({ name, description, imageUrl, price }) => (
    <div className="col-md-6">
        <div className="dish-container">
            <div className="dish-image-container">
                <img className="dish-image" src={imageUrl} alt={name} />
            </div>
            <div className="dish-text-container">
                <h4 className="dish-name">{name}</h4>
                <p className="dish-description small-text">{description}</p>
                <div className="dish-price"><span className="currency-sign">$</span>{price}</div>
            </div>
            <div className="dish-edit">
                <a
                  href="#edit-dish"
                  data-toggle="modal"
                  data-target="#edit-dish"
                >
                    <span title="edit" className="glyphicon glyphicon-pencil" />
                    &nbsp;
                    <span className="hidden-xs">Edit</span>
                </a>
                <a
                  href="#delete-dish"
                  data-toggle="modal"
                  data-target="#delete-dish"
                >
                    <span title="remove" className="glyphicon glyphicon-remove" />
                    &nbsp;
                    <span className="hidden-xs">Delete</span>
                </a>
            </div>
        </div>
    </div>
);

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default Dish;
