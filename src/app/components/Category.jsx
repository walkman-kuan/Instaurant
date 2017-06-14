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
                <a href={`#category_edit_${order}`}>
                    <span title="edit" className="glyphicon glyphicon-pencil" />
                </a>
                <a href={`#category_remove_${order}`}>
                    <span title="remove" className="glyphicon glyphicon-remove" />
                </a>
                <a href={`#category_reorder_${order}`}>
                    <span title="reorder" className="glyphicon glyphicon-move" />
                </a>
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
