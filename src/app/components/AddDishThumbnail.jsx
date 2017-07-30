import React from 'react';

const AddDishThumbnail = () => (
    <div className="col-md-6">
        <div className="dish-container">
            <a
              href="#add-dish-thumbnail"
              className="non-shadow-outlline"
              data-toggle="modal"
              data-target="#add-dish"
            >
                <img
                  className="center-block add-dish-image" alt="Add dish"
                  src={require('../resources/images/plus-symbol.svg')}
                />
            </a>
        </div>
    </div>
);

export default AddDishThumbnail;
