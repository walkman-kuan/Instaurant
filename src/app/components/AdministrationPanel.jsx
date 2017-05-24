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
                        <ul className="nav navbar-nav right-aligned-nav">
                            <li>
                                <Link to="/qrCode">
                                    <span className="glyphicon glyphicon-qrcode" />
                                    <span className="nav-text">&nbsp;QR Code</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">
                                    <span className="glyphicon glyphicon-user" />
                                    <span className="nav-text">&nbsp;Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/signin" onClick={this.onSignOut}>
                                    <span className="glyphicon glyphicon-off" />
                                    <span className="nav-text">&nbsp;Sign out</span>
                                </Link>
                            </li>
                        </ul>
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
