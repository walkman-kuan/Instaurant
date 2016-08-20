/*
    The component hierarchy is:
           MenuTab
            - MenuItems
            - EditModal
            - RemoveModal

            - AddItem
            - AddModal
*/

var AddModal = React.createClass({
    render : function() {

    }
});

var RemoveModal = React.createClass({
    handleRemoveSave : function(event) {
        //TODO: Send request to server
    },
    render : function() {
        return (
            <div className="removeModal modal fade" id="removeModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Remove Item</h4>
                  </div>
                  <div className="modal-body">
                      <p>Are you sure you want to remove {this.props.item.name}?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleRemoveSave}>Yes</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
});

var EditModal = React.createClass({
    handleModalEditFormSubmits : function() {
        this.uploadImage();
        // Pass the edit data to the MenuTab
        this.props.onEditFormSubmit(
            this.props.item.key,
            this.props.item.imageUrl,
            this.props.item.name,
            this.props.item.description,
            this.props.item.price
        );
    },
    handleItemInfoEdit : function(event) {
        this.props.onItemInfoEdit(event.target.id, event.target.value);
    },
    displayImageThumbnail : function(event) {
        // Display a thumbnail of the uploaded image using object URL
        // TODO: Style the image
        var files = event.target.files;
        var img = this.refs.imageThumbnail;
        if (files.length) {
            var file = files[0];
            img.src = URL.createObjectURL(file);
            img.onload = function() { // Release the object URL once the image has been loaded
                URL.revokeObjectURL(this.src);
            }
        } else { // Reset the src if file picker is open, and no file is chosen
            img.src = "";
        }
    },
    uploadImage : function() { // Upload the image to Firebase Storage, and return the downloadURL
        var downloadURL = "An url of an image showing that uploading fails!";
        var files = this.refs.uploadImage.files;
        if (files.length) { // If there is a file
            var file = files[0];
            console.log("The file name is " + file.name);
            if (!file.type.match("image.*")) { // If the file is NOT an image
                return downloadURL; // Return the original image url
            }
            // Right now, the reference is the storage bucket
            // TODO: The reference can be user.uid/tabId/ + Date.now() + /file.name
            var uploadTask = firebase.storage().ref(file.name).put(file, {'contentType' : file.type});
            uploadTask.on("state_changed", null, function(error) {
                console.log('There was an error uploading the file to Firebase Storage', error);
            }, function() {
                console.log("The downloadURL is " + uploadTask.snapshot.downloadURL);
                downloadURL = uploadTask.snapshot.downloadURL;
            });
        }
        console.log("The downloadURL (outside) is " + uploadTask.snapshot.downloadURL);
        return downloadURL;
    },
    render : function() {
        return (
            <div className="editModal modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Edit Menu Item Information</h4>
                  </div>
                  <div className="modal-body">
                      <form role="form">
                          <div className="form-group">
                              <label className="custom-file">
                                <input type="file" className="custom-file-input" ref="uploadImage" onChange={this.displayImageThumbnail}/>
                                <span className="custom-file-control"></span>
                              </label>
                              <img className="img-responsive" src="" ref="imageThumbnail"/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="itemName">Item Name</label>
                              <input type="text" id="name" className="form-control" value={this.props.item.name} onChange={this.handleItemInfoEdit}/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="itemDescription">Item Description</label>
                              <textarea id="description" rows="4" className="form-control" value={this.props.item.description} onChange={this.handleItemInfoEdit}></textarea>
                          </div>
                          <div className="form-group">
                              <label htmlFor="itemPrice">Item Price</label>
                              <input id="price" type="text" className="form-control" value={this.props.item.price} onChange={this.handleItemInfoEdit}/>
                          </div>
                      </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleModalEditFormSubmits}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
});

var AddItem = React.createClass({
    render : function() {

    }
});

var MenuItem = React.createClass({
    handleItemEdit : function() {
        this.props.onEditButtonClick(
            this.props.item.key,
            this.refs.imageUrl.src,
            this.refs.name.innerHTML,
            this.refs.description.innerHTML,
            this.refs.price.innerHTML
        );
    },
    handleItemRemove : function() {
        this.props.onRemoveButtonClick(
            this.props.item.key,
            this.refs.name.innerHTML
        );
    },
    render : function() {
        return(
            <div className="menuItem">
                <div className="col-xs-6 col-md-4">
                    <div className="thumbnail">
                        <img className="img-responsive" ref="imageUrl" src={this.props.item.imageUrl} alt="Image Alternative" />
                        <div className="caption">
                            <h3 ref="name">{this.props.item.name}</h3>
                            <p ref="description">{this.props.item.description}</p>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <p className="lead">$: <span ref="price">{this.props.item.price}</span></p>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <button className="btn btn-default"
                                            data-toggle="modal"
                                            data-target="#removeModal"
                                            onClick={this.handleItemRemove}>
                                            Remove
                                    </button>
                                    &nbsp;
                                    <button className="btn btn-default"
                                            data-toggle="modal"
                                            data-target="#editModal"
                                            value="Edit"
                                            onClick={this.handleItemEdit}>
                                            Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var MenuTab = React.createClass({

    getInitialState : function() {
        return {
            itemData : [],
            editModalData : {
                key : "",
                imageUrl : "",
                name : name,
                description : "",
                price : ""
            },
            removeModalData : {
                key : "",
                imageUrl : "",
                name : name,
                description : "",
                price : ""
            }
        };
    },
    // Get the data from Firebase realtime database.
    // The data is specific to an owner id, menu tab, and other unique information.
    loadDataFromFirebase : function () {
        this.database.ref("menu").once("value", function(snapshot) {
            var items = [];
            snapshot.forEach(function(data) {
                var item = {
                    key : data.key,
                    imageUrl : data.val().imageUrl,
                    name : data.val().name,
                    description : data.val().description,
                    price : data.val().price
                };

                items.push(item);
            });

            this.setState({itemData : items});
        }.bind(this));
    },
    /*
    getImageUrl : function() {
        this.storage.refFromURL(this.props.imageUrl).getDownloadURL().then(function(url) {
            this.setState({imageUrl : url});
        }.bind(this));
    },
    */
    handleEditButtonClick : function(key, imageUrl, name, description, price) {
        this.setState({editModalData : {
                key : key,
                imageUrl : imageUrl,
                name : name,
                description : description,
                price : price
            }
        });
    },
    handleRemoveButtonClick : function(key, name) {
        this.setState({removeModalData : {
                key : key,
                imageUrl : "",
                name : name,
                description : "",
                price : ""
            }
        });
    },
    handleItemInfoChange : function(element, value) {
         // Use [computed property name]
        var newData = React.addons.update(this.state.editModalData, {
            [element] : {$set : value}
        });
        this.setState({editModalData : newData});
    },
    componentWillMount : function() {
        this.database = firebase.database();
        this.storage = firebase.storage();

        this.loadDataFromFirebase();

        // Set listener for data change
        this.database.ref('menu').on("child_changed", this.handleUpdateItem);
        //this.database.ref('menu').on("child_added", this.handleUpdateItem);

    },
    handleUpdateItem : function(data) {
        // Find the index of the array element whose information will be updated
        var index = -1;
        this.state.itemData.map(function(item, i) {
            if (item.key === data.key) {
                index = i;
            }
        });

        // Mutate this.state.itemData at index `index`
        var updatedData = React.addons.update(this.state.itemData, {
            [index] : { $set : {
                key : data.key,
                imageUrl : data.val().imageUrl,
                name : data.val().name,
                description : data.val().description,
                price : data.val().price}}
        });

        this.setState({itemData : updatedData});
    },
    handleEditFormSubmit : function(key, imageUrl, name, description, price) {
        // Save the the change
        // TODO: The reference can be user.uid/tabId/ + Date.now() + /key
        this.database.ref('/menu/' + key).set({
            imageUrl : imageUrl,
            name : name,
            description : description,
            price : price
        }).then(function() {
            // Some process after saving
        }).catch(function(error) {
            console.log('Error updating item information to Firebase Database', error);
        });
    },
    render : function() {
        var MenuItems = this.state.itemData.map(function(item) {
            return (
                <MenuItem
                    key={item.key} // The prop `key` is invisible to child component!
                    item={item}
                    onRemoveButtonClick={this.handleRemoveButtonClick}
                    onEditButtonClick={this.handleEditButtonClick} />
            )
        }.bind(this));
        return(
            <div className="menuTab">
                <div className="row">
                    {MenuItems}
                </div>

                <EditModal
                    item={this.state.editModalData}
                    onItemInfoEdit={this.handleItemInfoChange}
                    onEditFormSubmit={this.handleEditFormSubmit}/>

                <RemoveModal item={this.state.removeModalData} />
            </div>
        );
    }
});

ReactDOM.render(<MenuTab url="the/url/for/a/specific/tab"/>, document.getElementById("container"));
