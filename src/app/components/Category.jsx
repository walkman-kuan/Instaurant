import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ id, name, order, isEditingCategory }) => (
    <li>
        <a
          href={`#category_${order}`}
          id={id}
          className={isEditingCategory ? 'disabled-link' : ''}
        >
            {name}
        </a>
        {isEditingCategory &&
            <div className="category-edit">
                <span className="glyphicon glyphicon-pencil" />
                <span className="glyphicon glyphicon-move" />
            </div>
        }
    </li>
);

Category.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    isEditingCategory: PropTypes.bool.isRequired,
};

export default Category;
