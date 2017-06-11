import React, { Component } from 'react';

class ConfigureCategory extends Component {
    // Simulate a click to show the modal
    componentDidMount() {
        this.hiddenButton.click();
    }

    render() {
        return (
            <div>
                {/* Modal */}
                <div className="modal fade" id="start-configure-menu" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Configure Your Menu</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Click the add category button in the Category section
                                    to add a new category and start to configure your menu!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hidden button */}
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#start-configure-menu"
                  ref={(input) => { this.hiddenButton = input; }}
                />
            </div>
        );
    }
}

export default ConfigureCategory;
