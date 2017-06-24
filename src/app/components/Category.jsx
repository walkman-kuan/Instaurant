import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedCategory } from '../actions/actionCreator';

const Category = ({ id, name, isEditingCategories, dispatch }) => {
    const handleEditCategoryClick = () => {
        dispatch(selectedCategory(id));
    };

    const handleRemoveCategoryClick = () => {
        dispatch(selectedCategory(id));
    };

    return (
        <li>
            <a
              href={`#categoryId=${id}`}
              id={id}
              className={isEditingCategories ? 'disabled-link' : ''}
            >
                {name}
            </a>
            {isEditingCategories &&
                <div className="category-edit">
                    <a
                      href={`#categoryId=${id}`}
                      data-toggle="modal"
                      data-target="#edit-category"
                      onClick={handleEditCategoryClick}
                    >
                        <span title="edit" className="glyphicon glyphicon-pencil" />
                    </a>
                    <a
                      href={`#categoryId=${id}`}
                      data-toggle="modal"
                      data-target="#delete-category"
                      onClick={handleRemoveCategoryClick}
                    >
                        <span title="remove" className="glyphicon glyphicon-remove" />
                    </a>
                    <a href={`#categoryId=${id}`}>
                        <span title="reorder" className="glyphicon glyphicon-move" />
                    </a>
                </div>
            }
        </li>
    );
};

Category.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isEditingCategories: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Category);
