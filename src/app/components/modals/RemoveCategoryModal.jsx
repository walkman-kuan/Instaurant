import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentSignInUser } from '../../firebaseService';
import { getAffectedCategoriesOnDelete } from '../../utils/instaurantUtils';
import { deleteCategoryFromFirebase } from '../../actions/asyncActionCreator';

class RemoveCategoryModal extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Update the displayed category name
     *
     * This gets called when
     * 1. The first time we delete a category
     * 2. Delete a category, and click to delete another category
     * 3. Whenever the store gets updated
     *
     * This does NOT get called when:
     * 1. Click to delete a category, but cancel deleting, and click to delete the same category again
     */
    componentWillReceiveProps({ selectedCategoryId, categories }) {
        if (selectedCategoryId !== '' && categories[selectedCategoryId]) {
            this.deletedCategoryName = categories[selectedCategoryId].name;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch, selectedCategoryId, categories } = this.props;
        const keys = Object.keys(categories);
        const indexOfDeletedCategory = keys.indexOf(selectedCategoryId);

        if (indexOfDeletedCategory !== -1) {
            const ownerId = getCurrentSignInUser().uid;
            const updatedCategories = getAffectedCategoriesOnDelete(indexOfDeletedCategory, keys, categories);
            dispatch(deleteCategoryFromFirebase(ownerId, updatedCategories, selectedCategoryId));
        }

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        this.cancelBtn.click();
    }

    render() {
        return (
            <div
              className="modal fade" id="delete-category" tabIndex="-1" role="dialog"
              data-backdrop="static" data-keyboard="false"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Delete category</h4>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <span>
                                    Are you sure you want to delete <strong>{ this.deletedCategoryName }</strong>?
                                    Deleting <strong>{ this.deletedCategoryName }</strong> will
                                     also delete <strong>all dishes</strong> associated with it.
                                </span>
                            </div>
                            <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-default outline narrow non-shadow-outlline"
                                  data-dismiss="modal"
                                  ref={(cancelBtnNode) => { this.cancelBtn = cancelBtnNode; }}
                                >
                                Cancel
                                </button>
                                <button
                                  type="submit" className="btn btn-danger outline narrow non-shadow-outlline"
                                >Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

RemoveCategoryModal.propTypes = {
    selectedCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
    {
        selectedCategoryId: state.selectedCategory,
        categories: state.category.items,
    }
);

export default connect(mapStateToProps)(RemoveCategoryModal);
