import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signOut } from '../firebaseService';

class NavBar extends Component {
    constructor() {
        super();
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                          type="button"
                          className="navbar-toggle sidebar-toggle"
                          onClick={this.props.onToggleSiderbar}
                        >
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        {/* Put the logo here */}
                        <Link to="/admin" className="navbar-brand">Instaurant</Link>
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
        );
    }
}

NavBar.propTypes = {
    onToggleSiderbar: PropTypes.func.isRequired,
};

export default NavBar;
