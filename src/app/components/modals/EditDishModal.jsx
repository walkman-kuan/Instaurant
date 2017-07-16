import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addDragAndDropListeners, formatItemName } from '../../utils/instaurantUtils';
import { selecteDish } from '../../actions/actionCreator';
import { updateDishInfo } from '../../actions/asyncActionCreator';

class EditDishModal extends Component {
    constructor() {
        super();
        this.state = {
            imageReadyForPreview: true,
            imageOver: false,
        };
        this.handleClickToSelectImage = this.handleClickToSelectImage.bind(this);
        this.handleImageEnterOrOverDropZone = this.handleImageEnterOrOverDropZone.bind(this);
        this.handleImageLeaveDropZoneOrDropDone = this.handleImageLeaveDropZoneOrDropDone.bind(this);
        this.handleImagePreview = this.handleImagePreview.bind(this);
        this.handleDismissBtnClick = this.handleDismissBtnClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Reset `selectedDishId` to '' so that whenever we click to edit a dish, Redux
     * always re-renders the Edit Modal, i.e., componentWillReceiveProps is always called.
     *
     * Without resetting `selectedDishId`: If we navigate back from any routing point, and
     * click to edit the SAME dish we just edited before, Redux won't re-render this
     * Modal because the prev and current states, i.e., `selectedDishId`, are the same!
     *
     * As a result, the dish fields will be empty, or the default values will show
     * if specified.
     */
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(selecteDish(''));

        // The add dish modal isn't a valid drop zone - dropEffect is 'none'
        addDragAndDropListeners(this.editDishModal, 'none');
        // The image drop zone is a valid drop zone - dropEffect is 'copy'
        addDragAndDropListeners(this.imageDropZone, 'copy',
            this.handleImagePreview,
            this.handleImageEnterOrOverDropZone,
            this.handleImageLeaveDropZoneOrDropDone,
        );
    }

    /**
     * Populate the fields with the currently editing dish
     *
     * This gets called when
     * 1. The first time we edit a dish
     * 2. Edit a dish, save it, and click to edit the same dish again
     * 3. Edit a dish, save it, and click to edit another dish
     * 4. Whenever the store gets updated
     *
     * This does NOT get called when:
     * 1. Edit a dish, cancel editing, and click to edit the same dish again
     * 2. Edit a dish, but new dish === old dish, save it, and click to edit
     * the same dish again
     */
    componentWillReceiveProps({ selectedDishId, dishes }) {
        if (selectedDishId && dishes[selectedDishId]) {
            const selectedDish = dishes[selectedDishId];

            // Set the dish info before editing
            this.dishNameBeforeEditing = selectedDish.name;
            this.dishDescriptionBeforeEditing = selectedDish.description;
            this.dishPriceBeforeEditing = selectedDish.price;
            this.dishImageUrlBeforeEditing = selectedDish.imageUrl;

            // Set the displayed dish info
            this.dishNameDomElem.value = selectedDish.name;
            this.dishDescrDomElem.value = selectedDish.description;
            this.dishPriceDomElem.value = selectedDish.price;
            this.previewImageDomElem.src = selectedDish.imageUrl;
        }
    }

    // Return a dish info object containing the updated dish info, e.g.,
    // { name: Dynamite roll, price: 8, file: this.file }
    getUpdatedDishTextInfo() {
        return {
            // Conditionally add dish property
            ...formatItemName(this.dishNameDomElem.value) !== this.dishNameBeforeEditing
            && { name: formatItemName(this.dishNameDomElem.value) },
            ...this.dishDescrDomElem.value !== this.dishDescriptionBeforeEditing
            && { description: this.dishDescrDomElem.value },
            ...this.dishPriceDomElem.value !== this.dishPriceBeforeEditing
            && { price: this.dishPriceDomElem.value },
            ...(this.file && /^image\//i.test(this.file.type))
            && { image: this.file },
        };
    }

    handleImageEnterOrOverDropZone() {
        this.setState(prevState => ({ ...prevState, imageOver: true }));
    }

    handleImageLeaveDropZoneOrDropDone() {
        this.setState(prevState => ({ ...prevState, imageOver: false }));
    }

    handleClickToSelectImage() {
        this.imagePickerDomElem.click();
    }

    handleImagePreview(event) {
        // If file is selected using drag and drop, event.dataTransfer is
        // defined and we use DataTransfer interface to access the file(s)
        const files = event.dataTransfer !== undefined
            ? event.dataTransfer.files // For drag and drop
            : event.target.files; // For file picker

        // files.length could be zero, e.g., file picker is open, but no file is selected.
        // Store the file in a class variable, which will be used in the uploading process later
        this.file = files.length && files[0];
        // If the file exist and is an image
        if (this.file && /^image\//i.test(this.file.type)) {
            this.previewImageDomElem.src = URL.createObjectURL(this.file);
            this.previewImageDomElem.onload = () => {
                // Release the object URL once the image has been loaded
                window.URL.revokeObjectURL(this.src);
            };
            this.setState(prevState => ({ ...prevState, imageReadyForPreview: true }));
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        // Update dish if necessary/different
        const updatedDishInfo = this.getUpdatedDishTextInfo();
        if (Object.keys(updatedDishInfo).length > 0) {
            const { configuredCategoryId, selectedDishId, dishes, dispatch } = this.props;
            dispatch(updateDishInfo(configuredCategoryId, dishes[selectedDishId], updatedDishInfo));
        }

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        this.cancelBtnDomElem.click();
    }

    /**
     * Reset all UI states and the displayed dish info to the dish info before editing if
     * a user enters new dish info, but clicks cancel. This makes sure that when the
     * Modal shows again, the displayed dish info will always be the current dish info,
     * not the dirty displayed dish info left from previous cancelled editing!
     *
     * Note that this method gets called on submitBtn, cancelBtn and CloseBtn click.
     * If called on submitBtn, dom element values/url will be set the old values, but
     * it is OK.
     */
    handleDismissBtnClick() {
        this.dishNameDomElem.value = this.dishNameBeforeEditing;
        this.dishDescrDomElem.value = this.dishDescriptionBeforeEditing;
        this.dishPriceDomElem.value = this.dishPriceBeforeEditing;
        this.previewImageDomElem.src = this.dishImageUrlBeforeEditing;
        this.setState(prevState => ({
            ...prevState,
            imageOver: false,
            imageReadyForPreview: true,
        }));
        // Set the file to null, otherwise, it will always be there if the component
        // is not unmounted. As a result, if we add a new dish without an image, the
        // previous image will be used!
        this.file = null;
    }

    render() {
        const imageZoneClass = classNames(
            'image-drop-zone',
            'upload-image-target',
            { 'image-over': this.state.imageOver },
        );
        const previewImageClass = classNames(
            'centered preview-image',
            { hidden: !this.state.imageReadyForPreview },
        );
        const dragImageTextClass = classNames(
            'centered',
            { hidden: this.state.imageReadyForPreview },
        );
        return (
            <div
              className="modal fade" id="edit-dish" tabIndex="-1" role="dialog"
              data-backdrop="static" data-keyboard="false"
              ref={(editDishModalDomElement) => { this.editDishModal = editDishModalDomElement; }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                              type="button" className="close" data-dismiss="modal" aria-label="Close"
                              onClick={this.handleDismissBtnClick}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Edit dish</h4>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div
                                  className={imageZoneClass}
                                  ref={(imageDropZoneDomElem) => { this.imageDropZone = imageDropZoneDomElem; }}
                                >
                                    <img
                                      className={previewImageClass} alt="Preview"
                                      ref={(previewImageDomElem) => { this.previewImageDomElem = previewImageDomElem; }}
                                    />
                                    <p className={dragImageTextClass}>
                                        <span className="hidden-on-xs">Drag a dish image here</span>
                                    </p>
                                    <p className={dragImageTextClass}>
                                        <span className="visible-on-xs">Dish image preview</span>
                                    </p>
                                </div>
                                <div className="text-center upload-image-target ">
                                    <span className="hidden-on-xs">Or&nbsp;</span>
                                    <button
                                      type="button"
                                      className="btn btn-default non-shadow-outlline"
                                      onClick={this.handleClickToSelectImage}
                                    >Select a dish image</button>
                                </div>
                                <div className="form-group">
                                    <input
                                      type="file" className="hidden" accept="image/*"
                                      ref={(imagePickerDomElem) => { this.imagePickerDomElem = imagePickerDomElem; }}
                                      onChange={this.handleImagePreview}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                      type="text" className="form-control"
                                      id="edit-dish-name" required
                                      ref={(dishNameDomElem) => { this.dishNameDomElem = dishNameDomElem; }}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                      rows="4" className="form-control" id="edit-dish-description"
                                      maxLength="300" required
                                      ref={(dishDescrDomElem) => { this.dishDescrDomElem = dishDescrDomElem; }}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input
                                          type="text" className="form-control"
                                          id="edit-dish-price" required
                                          ref={(dishPriceDomElem) => { this.dishPriceDomElem = dishPriceDomElem; }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-default outline narrow non-shadow-outlline"
                                  data-dismiss="modal"
                                  ref={(cancelBtnDomElem) => { this.cancelBtnDomElem = cancelBtnDomElem; }}
                                  onClick={this.handleDismissBtnClick}
                                >Cancel</button>
                                <button
                                  type="submit" className="btn btn-primary outline narrow non-shadow-outlline"
                                >Save change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditDishModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    configuredCategoryId: PropTypes.string.isRequired,
    selectedDishId: PropTypes.string.isRequired,
    dishes: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
};

const mapStateToProps = state => (
    {
        configuredCategoryId: state.configuredCategoryId,
        selectedDishId: state.selectedDishId,
        dishes: state.dish[state.configuredCategoryId]
            ? state.dish[state.configuredCategoryId].items : {},
    }
);

export default connect(mapStateToProps)(EditDishModal);
