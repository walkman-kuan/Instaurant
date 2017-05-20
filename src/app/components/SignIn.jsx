import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    render() {
        return (
            <div className="container-fluid auth-page">
                <h1>Sign In</h1>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
                        <form id="sign-in-form">
                            <div className="form-group">
                                <div className="input-group input-group-lg">
                                    <input
                                      type="email" className="form-control"
                                      id="email" name="email" placeholder="Email"
                                      ref={(email) => { this.email = email; }}
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
                                      ref={(password) => { this.password = password; }}
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

export default SignIn;
