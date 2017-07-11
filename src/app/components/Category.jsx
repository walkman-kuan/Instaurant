import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { selecteCategory, configureCategory } from '../actions/actionCreator';
import { fetchDishesIfNeeded } from '../actions/asyncActionCreator';

const Category = ({ id, name, isEditingCategories, onConfiguringCategory, configuredCategoryId, dispatch }) => {
    const handleConfigureCategoryClick = () => {
        dispatch(configureCategory(id));
        dispatch(fetchDishesIfNeeded());
        // Hide the sidebar if it shows on mobile view
        onConfiguringCategory();
    };

    const handleEditCategoryClick = () => dispatch(selecteCategory(id));

    const handleRemoveCategoryClick = () => dispatch(selecteCategory(id));

    const getCategoryLinkClass = () => (
        classNames({
            'disabled-link': isEditingCategories,
            // Highlight the category if it isn't being edited, and is being configured
            'hightlight-link': !isEditingCategories && id === configuredCategoryId,
        })
    );

    return (
        <li>
            <a
              href={`#categoryId=${id}`}
              id={id}
              className={getCategoryLinkClass()}
              onClick={handleConfigureCategoryClick}
            >
                {name}
            </a>
            {isEditingCategories &&
                <div className="category-edit">
                    <a
                      href={`#edit-categoryId=${id}`}
                      data-toggle="modal"
                      data-target="#edit-category"
                      onClick={handleEditCategoryClick}
                    >
                        <span title="edit" className="glyphicon glyphicon-pencil" />
                    </a>
                    <a
                      href={`#remove-categoryId=${id}`}
                      data-toggle="modal"
                      data-target="#remove-category"
                      onClick={handleRemoveCategoryClick}
                    >
                        <span title="delete" className="glyphicon glyphicon-remove" />
                    </a>
                    {/*
                    <a href={`#reorder-categoryId=${id}`}>
                        <span title="reorder" className="glyphicon glyphicon-move" />
                    </a>
                    */}
                </div>
            }
        </li>
    );
};

Category.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isEditingCategories: PropTypes.bool.isRequired,
    configuredCategoryId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onConfiguringCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ configuredCategoryId: state.configuredCategory });

export default connect(mapStateToProps)(Category);
