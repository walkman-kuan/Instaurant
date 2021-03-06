import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signOut } from '../firebaseService';

const NavBar = ({ onToggleSiderbar }) => {
    const handleSignOut = () => {
        signOut();
    };

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle sidebar-toggle"
                      onClick={onToggleSiderbar}
                    >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    {/* Put the logo here */}
                    <Link to="/admin" className="navbar-brand non-shadow-outlline">Instaurant</Link>
                </div>
                <ul className="nav navbar-nav right-aligned-nav">
                    <li>
                        <Link to="/qrCode">
                            <span className="glyphicon glyphicon-qrcode" />
                            &nbsp;
                            <span className="hidden-on-xs">QR Code</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            <span className="glyphicon glyphicon-user" />
                            &nbsp;
                            <span className="hidden-on-xs">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signin" onClick={handleSignOut}>
                            <span className="glyphicon glyphicon-off" />
                            &nbsp;
                            <span className="hidden-on-xs">Sign out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onToggleSiderbar: PropTypes.func.isRequired,
};

export default NavBar;
