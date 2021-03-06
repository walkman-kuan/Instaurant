import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signUpWithEmailAndPassword, firebaseAddOwner } from '../firebaseService';
import { handleSignUpError } from '../utils/errorHandling';

class SignUp extends Component {
    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        // On successful creation of the user account, this user will also be
        // signed in to your application, i.e., currentUser != null
        signUpWithEmailAndPassword({ email, password }).then((user) => {
            firebaseAddOwner(user.uid).then(() => {
                const { history } = this.props;
                // Route to the admin page.
                history.push('/admin');
            });
        }, (error) => {
            handleSignUpError(error);
        });
    }

    render() {
        return (
            <div className="container-fluid auth-page">
                <h1>Sign Up</h1>
                <div className="row">
                    <div
                      className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4"
                    >
                        <form id="sign-up-form" onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <div className="input-group input-group-lg">
                                    <input
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
                                <div className="input-group input-group-lg">
                                    <input
                                      type="password" className="form-control input-lg"
                                      id="password" name="password" placeholder="Password"
                                      ref={(password) => { this.password = password; }} required
                                    />
                                    <div className="input-group-addon">
                                        <span className="glyphicon glyphicon-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button
                                  type="submit" className="btn btn-default btn-block btn-lg non-shadow-outlline"
                                >Sign up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="route-group text-center">
                            Already have an Instaurant account?
                            &nbsp;
                            <Link to="/signin" className="btn btn-primary outline non-shadow-outlline">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    history: PropTypes.object.isRequired,
};

export default SignUp;
