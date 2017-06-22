import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentSignInUser } from '../../firebaseService';
import { selectedCategory } from '../../actions/actionCreator';
import { updateCategoryName } from '../../actions/asyncActionCreator';


class EditCategoryModal extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
    }

    // Reset `selectedCategory` to '' so that whenever we click to edit a category, Redux
    // always re-renders the Edit Modal, i.e.,  componentWillReceiveProps is always called.
    // Without resetting selectedCategory: If we navigate back from any routing point, and
    // click to edit the SAME category we just edited before, Redux won't re-render this
    // Modal because the prev and current states, i.e., `selectedCategory`, are the same!
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(selectedCategory(''));
    }

    /**
     * Populate the field with the name of the currently editing category
     *
     * This gets called when
     * 1. The first time we edit a category
     * 2. Edit a category, save it, and click to edit the same category again
     * 3. Edit a category, save it, and click to edit another category
     *
     * This does NOT get called when:
     * 1. Edit a category, cancel editing, and click to edit the same category again
     * 2. Edit a category, but new name === old name, save it, and click to edit
     * the same category again
     */
    componentWillReceiveProps({ selectedCategoryId, categories }) {
        if (selectedCategoryId !== '') {
            const currentCategoryName = categories[selectedCategoryId].name;

            // Set the category name before editing to the current category name
            this.categoryNameBeforeEditing = currentCategoryName;
            // Set the displayed category name
            this.categoryName.value = currentCategoryName;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const newCategoryName = this.categoryName.value;
        if (this.categoryNameBeforeEditing !== newCategoryName) {
            const ownerId = getCurrentSignInUser().uid;
            const { dispatch, selectedCategoryId } = this.props;
            dispatch(updateCategoryName(ownerId, selectedCategoryId, newCategoryName));

            // Update the categoryNameBeforeEditing to the new name
            this.categoryNameBeforeEditing = newCategoryName;
        }

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        this.cancelBtn.click();
    }

    /**
     * Reset the displayed category name to the category name before editing if a user
     * enters a new category name, but clicks cancel. This makes sure that when the
     * Modal shows again, the displayed category name will always be the current category
     * name, not the dirty displayed category name left from previous cancelled editing!
     *
     * Note that this method gets called on submitBtn and cancelBtn click
     */
    handleCancelBtnClick() {
        this.categoryName.value = this.categoryNameBeforeEditing;
    }

    render() {
        return (
            <div
              className="modal fade" id="edit-category" tabIndex="-1" role="dialog"
              data-backdrop="static" data-keyboard="false"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Edit category name</h4>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    {/* Using uncontrolled component */}
                                    <input
                                      type="text" className="form-control" id="edit-category-name"
                                      name="edit-category-name" defaultValue="defaultValue" required
                                      ref={(categoryNameNode) => { this.categoryName = categoryNameNode; }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-default"
                                  data-dismiss="modal"
                                  ref={(cancelBtnNode) => { this.cancelBtn = cancelBtnNode; }}
                                  onClick={this.handleCancelBtnClick}
                                >
                                Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                Save change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditCategoryModal.propTypes = {
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

export default connect(mapStateToProps)(EditCategoryModal);
