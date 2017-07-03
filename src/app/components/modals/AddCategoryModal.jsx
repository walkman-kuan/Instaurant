import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentSignInUser } from '../../firebaseService';
import { addCategoryToFirebase } from '../../actions/asyncActionCreator';
import { formatItemName } from '../../utils/instaurantUtils';


const AddCategoryModal = ({ dispatch, numOfCategories }) => {
    let categoryName;
    let cancelBtn;

    const handleSubmit = (event) => {
        event.preventDefault();

        const ownerId = getCurrentSignInUser().uid;
        // Add the new category to the end of the list
        const order = numOfCategories + 1;
        dispatch(addCategoryToFirebase(ownerId, formatItemName(categoryName.value), order));

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        cancelBtn.click();
    };

    /**
     * Reset category name field if a user enters a category name, but clicks cancel.
     * This makes sure that when the Modal shows again, the field shows the placeholder,
     * not the dirty category name left from previous cancelled editing!
     *
     * Note that this method gets called on submitBtn and cancelBtn click
     */
    const handleDismissBtnClick = () => {
        categoryName.value = '';
    };

    return (
        <div
          className="modal fade" id="add-category" tabIndex="-1" role="dialog"
          data-backdrop="static" data-keyboard="false"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                          type="button" className="close" data-dismiss="modal" aria-label="Close"
                          onClick={handleDismissBtnClick}
                        >
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
                                  id="add-category-name" name="add-category-name" placeholder="Category name"
                                  ref={(categoryNameNode) => { categoryName = categoryNameNode; }} required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-default outline narrow non-shadow-outlline"
                              data-dismiss="modal"
                              ref={(cancelBtnNode) => { cancelBtn = cancelBtnNode; }}
                              onClick={handleDismissBtnClick}
                            >Cancel</button>
                            <button
                              type="submit" className="btn btn-primary outline narrow non-shadow-outlline"
                            >Add</button>
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
