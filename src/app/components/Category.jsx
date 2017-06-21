import React from 'react';
import PropTypes from 'prop-types';

    <li>
        <a
          href={`#category_${order}`}
          id={id}
        >
            {name}
        </a>
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
const Category = ({ id, name, isEditingCategories }) => {
              className={isEditingCategories ? 'disabled-link' : ''}
            {isEditingCategories &&

Category.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isEditingCategories: PropTypes.bool.isRequired,
};

export default Category;
