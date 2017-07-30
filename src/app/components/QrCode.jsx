import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="container-fluid qr-code-page">
        <h1>QR Code</h1>
        <div className="row">
            <div
              className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4"
            >
                <div className="jumbotron text-center">
                    Instaurant is currenlty in Phase I. <strong>QR Code</strong> will be available in Phase II.
                </div>
                <div className="panel panel-default">
                    <div className="panel-body text-center">
                        Back to <Link to="/admin">Menu Configuration</Link>!
                    </div>
                </div>
            </div>
        </div>
    </div>
);
