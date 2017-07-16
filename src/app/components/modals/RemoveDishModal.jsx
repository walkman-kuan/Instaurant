import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAffectedDishesOnDelete } from '../../utils/instaurantUtils';
import { deleteDishFromFirebase } from '../../actions/asyncActionCreator';

class RemoveDishModal extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Update the displayed dish name
     *
     * This gets called when
     * 1. The first time we delete a dish
     * 2. Delete a dish, and click to delete another dish
     * 3. Whenever the store gets updated
     *
     * This does NOT get called when:
     * 1. Click to delete a dish, but cancel deleting, and click to delete the same dish again
     */
    componentWillReceiveProps({ selectedDishId, configuredCategory, dishes }) {
        if (selectedDishId && dishes[selectedDishId]) {
            this.deletedDishName = dishes[selectedDishId].name;
        }
        if (configuredCategory && configuredCategory.name) {
            this.configuredCategoryName = configuredCategory.name;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch, selectedDishId, dishes, configuredCategory } = this.props;
        const keys = Object.keys(dishes);
        const indexOfDeletedDish = keys.indexOf(selectedDishId);

        if (indexOfDeletedDish !== -1) {
            // The imageUrl will be used to get a reference for the image being deleted
            const imageUrl = dishes[selectedDishId].imageUrl;
            const updatedDishes = getAffectedDishesOnDelete(indexOfDeletedDish, keys, dishes);
            dispatch(deleteDishFromFirebase(configuredCategory.id, updatedDishes, selectedDishId, imageUrl));
        }

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        this.cancelBtn.click();
    }

    render() {
        return (
            <div
              className="modal fade" id="remove-dish" tabIndex="-1" role="dialog"
              data-backdrop="static" data-keyboard="false"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Delete dish</h4>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <span>
                                    Are you sure you want to delete <strong>{this.deletedDishName}</strong>
                                    {' '} under <strong>{this.configuredCategoryName}</strong>?
                                </span>
                            </div>
                            <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-default outline narrow non-shadow-outlline"
                                  data-dismiss="modal"
                                  ref={(cancelBtnNode) => { this.cancelBtn = cancelBtnNode; }}
                                >Cancel</button>
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

RemoveDishModal.propTypes = {
    selectedDishId: PropTypes.string.isRequired,
    configuredCategory: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        order: PropTypes.number,
    }).isRequired,
    dishes: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
    {
        selectedDishId: state.selectedDishId,
        configuredCategory: state.category.items[state.configuredCategoryId]
            ? state.category.items[state.configuredCategoryId] : {},
        dishes: state.dish[state.configuredCategoryId]
            ? state.dish[state.configuredCategoryId].items : {},
    }
);

export default connect(mapStateToProps)(RemoveDishModal);
