import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isUserSignedIn, signOut } from '../firebaseService';

class AdministrationPanel extends Component {
    constructor() {
        super();
        this.onSignOut = this.onSignOut.bind(this);
    }

    // If there is no signed-in user, redirect to the sign in page
    componentWillMount() {
        const { history } = this.props;
        if (!isUserSignedIn()) {
            history.replace('/signin');
        }
    }

    onSignOut() {
        signOut();
    }

    render() {
        return (
            <div className="admin-page-wrapper">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {/* Stay on current page if click */}
                            <Link to={this.props.location} className="navbar-brand">Instaurant</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="owner-nav-bar">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to="/qrCode">
                                        <span className="glyphicon glyphicon-qrcode" />&nbsp;QR Code
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile">
                                        <span className="glyphicon glyphicon-user" />&nbsp;Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signin" onClick={this.onSignOut}>
                                        <span className="glyphicon glyphicon-off" />&nbsp;Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <h1>This is the Administration Panel page!</h1>
            </div>
        );
    }
}

AdministrationPanel.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default AdministrationPanel;
