import React, { Component } from 'react';
import classNames from 'classnames';
import { addDragAndDropListeners } from '../../utils/instaurantUtils';

class AddDishModal extends Component {
    constructor() {
        super();
        this.state = {
            isImageAvailable: false,
            imageOver: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickToUploadImage = this.handleClickToUploadImage.bind(this);
        this.handleImageEnterOrOverDropZone = this.handleImageEnterOrOverDropZone.bind(this);
        this.handleImageLeaveDropZoneOrDropDone = this.handleImageLeaveDropZoneOrDropDone.bind(this);
    }

    componentDidMount() {
        addDragAndDropListeners(this.addDishModal, 'none');
        addDragAndDropListeners(this.imageDropZone, 'copy', () =>
            console.log('File Drop!'), this.handleImageEnterOrOverDropZone, this.handleImageLeaveDropZoneOrDropDone,
        );
    }

    handleImageEnterOrOverDropZone() {
        this.setState(prevState => ({ ...prevState, imageOver: true }));
    }

    handleImageLeaveDropZoneOrDropDone() {
        this.setState(prevState => ({ ...prevState, imageOver: false }));
    }

    handleSubmit(event) {
        event.preventDefault();

        // We can't add 'data-dismiss' to the 'addBtn', otherwise, the submit
        // functionality won't work. Therefore, simulate a click on 'cancelBtn',
        // after form submission, to dismiss the modal
        this.cancelBtn.click();
    }

    handleClickToUploadImage() {
        this.uploadImage.click();
    }

    render() {
        const imageZoneClass = classNames({
            'image-drop-zone': true,
            'upload-image-target': true,
            'image-over': this.state.imageOver,
        });
        return (
            <div
              className="modal fade" id="add-dish" tabIndex="-1" role="dialog"
              data-backdrop="static" data-keyboard="false"
              ref={(addDishModalDomElement) => { this.addDishModal = addDishModalDomElement; }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Add a new dish</h4>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div
                                  className={imageZoneClass}
                                  ref={(imageDropZoneDomElement) => { this.imageDropZone = imageDropZoneDomElement; }}
                                >
                                    { this.isImageAvailable ? (
                                        <img className="centered" src="" alt="Uploading fail" />
                                    ) : (
                                        <p className="centered">Drag a dish image here</p>
                                    )}
                                </div>
                                <div className="text-center upload-image-target ">
                                    Or&nbsp;
                                    <button
                                      type="button"
                                      className="btn btn-default non-shadow-outlline"
                                      onClick={this.handleClickToUploadImage}
                                    >Select a dish image</button>
                                </div>
                                <div className="form-group">
                                    <input
                                      type="file" className="hidden" accept="image/*"
                                      ref={(uploadImageNode) => { this.uploadImage = uploadImageNode; }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                      type="text" className="form-control"
                                      id="add-dish-name" placeholder="Dish name" required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                      rows="4" className="form-control" id="add-dish-description"
                                      placeholder="Dish description" maxLength="300" required
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input
                                          type="text" className="form-control"
                                          id="add-dish-price" placeholder="Price" required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-default outline narrow non-shadow-outlline"
                                  data-dismiss="modal"
                                  ref={(cancelBtnNode) => { this.cancelBtn = cancelBtnNode; }}
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

export default AddDishModal;
