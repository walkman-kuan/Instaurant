import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditCategoryModal extends Component {
    // Populate the field with the name of the ncurrently editing category
    componentWillReceiveProps({ selectedCategoryName }) {
        if (selectedCategoryName !== this.props.selectedCategoryName) {
            this.categoryName.value = selectedCategoryName;
        }
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
                        <form role="form">
                            <div className="modal-body">
                                <div className="form-group">
                                    {/* Using uncontrolled component */}
                                    <input
                                      type="text" className="form-control"
                                      id="edit-category-name" name="edit-category-name" defaultValue="" required
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
                                >
                                Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">Save change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditCategoryModal.propTypes = {
    selectedCategoryName: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
    {
        // Return 'initialValue' when Redux call our reducers for the first time
        selectedCategoryName: state.selectedCategory === '' ? 'initialValue'
         : state.category.items[state.selectedCategory].name,
    }
);

export default connect(mapStateToProps)(EditCategoryModal);
