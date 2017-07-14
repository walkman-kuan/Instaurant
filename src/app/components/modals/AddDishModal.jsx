import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addDragAndDropListeners, formatItemName } from '../../utils/instaurantUtils';
import { addDishToFirebase } from '../../actions/asyncActionCreator';

class AddDishModal extends Component {
    constructor() {
        super();
        this.state = {
            imageReadyForPreview: false,
            imageOver: false,
        };
        this.handleClickToSelectImage = this.handleClickToSelectImage.bind(this);
        this.handleImageEnterOrOverDropZone = this.handleImageEnterOrOverDropZone.bind(this);
        this.handleImageLeaveDropZoneOrDropDone = this.handleImageLeaveDropZoneOrDropDone.bind(this);
        this.handleImagePreview = this.handleImagePreview.bind(this);
        this.handleDismissBtnClick = this.handleDismissBtnClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // The add dish modal isn't a valid drop zone - dropEffect is 'none'
        addDragAndDropListeners(this.addDishModal, 'none');
        // The image drop zone is a valid drop zone - dropEffect is 'copy'
        addDragAndDropListeners(this.imageDropZone, 'copy',
            this.handleImagePreview,
            this.handleImageEnterOrOverDropZone,
            this.handleImageLeaveDropZoneOrDropDone,
        );
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

        if (this.file && /^image\//i.test(this.file.type)) {
            const { categoryId, numOfDishes, dispatch } = this.props;
            // Add the new dish to the end of the list
            const order = numOfDishes + 1;
            dispatch(addDishToFirebase(
                categoryId,
                formatItemName(this.dishNameDomElem.value),
                this.dishDescrDomElem.value,
                this.dishPriceDomElem.value,
                this.file,
                order),
            );
        }

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        this.cancelBtnDomElem.click();
    }

    // Reset all fields and UI states after dimissing modal
    handleDismissBtnClick() {
        this.dishNameDomElem.value = '';
        this.dishDescrDomElem.value = '';
        this.dishPriceDomElem.value = '';
        this.previewImageDomElem.src = '';
        this.setState(prevState => ({
            ...prevState,
            imageOver: false,
            imageReadyForPreview: false,
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
              className="modal fade" id="add-dish" tabIndex="-1" role="dialog"
              data-backdrop="static" data-keyboard="false"
              ref={(addDishModalDomElement) => { this.addDishModal = addDishModalDomElement; }}
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
                            <h4 className="modal-title">Add a new dish</h4>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div
                                  className={imageZoneClass}
                                  ref={(imageDropZoneDomElem) => { this.imageDropZone = imageDropZoneDomElem; }}
                                >
                                    <img
                                      className={previewImageClass} src="" alt="Preview"
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
                                      id="add-dish-name" placeholder="Dish name" required
                                      ref={(dishNameDomElem) => { this.dishNameDomElem = dishNameDomElem; }}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                      rows="4" className="form-control" id="add-dish-description"
                                      placeholder="Dish description" maxLength="300" required
                                      ref={(dishDescrDomElem) => { this.dishDescrDomElem = dishDescrDomElem; }}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input
                                          type="text" className="form-control"
                                          id="add-dish-price" placeholder="Price" required
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
                                >Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddDishModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    numOfDishes: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
    {
        categoryId: state.configuredCategoryId,
        // Return 0 if state.dish[categoryId] is undefined
        numOfDishes: state.dish[state.configuredCategoryId]
            ? Object.keys(state.dish[state.configuredCategoryId].items).length
            : 0,
    }
);

export default connect(mapStateToProps)(AddDishModal);
