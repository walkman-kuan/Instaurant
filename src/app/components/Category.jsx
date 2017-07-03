import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { selectedCategory, configureCategory } from '../actions/actionCreator';

const Category = ({ id, name, isEditingCategories, configuredCategoryId, dispatch }) => {
    const handleConfigureCategoryClick = () => dispatch(configureCategory(id));

    const handleEditCategoryClick = () => dispatch(selectedCategory(id));

    const handleRemoveCategoryClick = () => dispatch(selectedCategory(id));

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
    configuredCategoryId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ configuredCategoryId: state.configuredCategory });

export default connect(mapStateToProps)(Category);
