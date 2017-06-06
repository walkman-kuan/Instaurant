import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../firebaseService';
import { handleSignInError } from '../utils/errorHandling';

class SignIn extends Component {
    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        signInWithEmailAndPassword({ email, password }).then(() => {
            const { history } = this.props;
            // Route to the admin page.
            history.push('/admin');
        }, (error) => {
            handleSignInError(error);
        });
    }
    render() {
        return (
            <div className="container-fluid auth-page">
                <h1>Sign In</h1>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
                        <form id="sign-in-form" onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <div className="input-group input-group-lg">
                                    {/* TODO: Considering using controlled components
                                        to take advantage of their benefits */}
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
                            <div className="forgot-password text-right">
                                <Link to="/reset-password">Forget your password?</Link>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-default btn-block btn-lg">Sign in</button>
                            </div>
                        </form>
                        <hr />
                        <div className="route-group text-center">
                            Need an Instaurant account?
                            &nbsp;
                            <Link to="/signup" className="btn btn-default outline">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    history: PropTypes.object.isRequired,
};

export default SignIn;
