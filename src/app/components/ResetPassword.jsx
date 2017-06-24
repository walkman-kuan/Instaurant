import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../firebaseService';
import { handlePasswordResetError } from '../utils/errorHandling';

class ResetPassword extends Component {
    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const email = this.email.value;

        sendPasswordResetEmail(email).catch((error) => {
            handlePasswordResetError(error);
        });
    }
    render() {
        return (
            <div className="container-fluid auth-page">
                <h1>Reset Password</h1>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
                        <span className="reset-password-text">
                            Enter the email associated with your Instaurant account,
                            and we will email you a link to reset your password.
                        </span>
                        <form id="reset-password-form" onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <div className="input-group input-group-lg">
                                    <input
                                      autoFocus
                                      type="email" className="form-control"
                                      id="email" name="email" placeholder="Email"
                                      ref={(email) => { this.email = email; }} required
                                    />
                                    <div className="input-group-addon">
                                        <span className="glyphicon glyphicon-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-default btn-block btn-lg">
                                    Send reset email
                                </button>
                            </div>
                        </form>
                        <hr />
                        <div className="route-group text-center">
                            Reset password successfully?
                            &nbsp;
                            <Link to="/signin" className="btn btn-default outline">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ResetPassword;
