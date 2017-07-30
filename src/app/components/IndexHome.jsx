import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="container-fluid home-page">
        <h1>Instaurant</h1>
        <div className="row">
            <div
              className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4"
            >
                <div className="jumbotron text-center">
                    <strong>
                        Powerful and user-friendly system for managing online menus and services for restaurants.
                    </strong>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body text-center">
                        <Link to="/signin">Sign in</Link> and manage your online menu!
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body text-center">
                        Need an Instaurant account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
