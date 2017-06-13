import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentSignInUser } from '../../firebaseService';
import { addCategoryToFirebase } from '../../actions/asyncActionCreator';

const AddCategoryModal = ({ dispatch, numOfCategories }) => {
    let categoryName;
    let cancelBtn;

    const handleSubmit = (event) => {
        event.preventDefault();

        const ownerId = getCurrentSignInUser().uid;
        // Add the new category to the end of the list
        const order = numOfCategories + 1;
        dispatch(addCategoryToFirebase(ownerId, categoryName.value, order));

        // Reset the name field so that it is empty when shown again
        categoryName.value = '';

        // We can't add 'data-dismiss' to the 'addBtn', therefore, simulate a click
        // on 'cancelBtn', after form submission, to dismiss the modal
        cancelBtn.click();
    };

    return (
        <div
          className="modal fade" id="add-category" tabIndex="-1" role="dialog"
          data-backdrop="static" data-keyboard="false"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add a new category</h4>
                    </div>
                    <form role="form" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                {/* Using uncontrolled component */}
                                <input
                                  type="text" className="form-control"
                                  id="category-name" name="category-ame" placeholder="Category name"
                                  ref={(categoryNameNode) => { categoryName = categoryNameNode; }} required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-default"
                              data-dismiss="modal"
                              ref={(cancelBtnNode) => { cancelBtn = cancelBtnNode; }}
                            >
                            Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

AddCategoryModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    numOfCategories: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({ numOfCategories: Object.keys(state.category.items).length });

export default connect(mapStateToProps)(AddCategoryModal);
