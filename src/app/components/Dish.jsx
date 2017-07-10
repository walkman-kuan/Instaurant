import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedDish } from '../actions/actionCreator';

const Dish = ({ id, name, description, imageUrl, price, dispatch }) => {
    const handleRemoveDishClick = () => dispatch(selectedDish(id));

    return (
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
                      href={`#edit-dishId=${id}`}
                      data-toggle="modal"
                      data-target="#edit-dish"
                    >
                        <span title="edit" className="glyphicon glyphicon-pencil" />
                        &nbsp;
                        <span className="hidden-xs">Edit</span>
                    </a>
                    <a
                      href={`#remove-dishId=${id}`}
                      data-toggle="modal"
                      data-target="#remove-dish"
                      onClick={handleRemoveDishClick}
                    >
                        <span title="delete" className="glyphicon glyphicon-remove" />
                        &nbsp;
                        <span className="hidden-xs">Delete</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

Dish.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Dish);
