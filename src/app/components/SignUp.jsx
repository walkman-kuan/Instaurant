import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    render() {
        return (
            <div className="container-fluid auth-page">
                <h1>Sign Up</h1>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
                        <form id="sign-up-form">
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
                            <div className="form-group">
                                <button type="submit" className="btn btn-default btn-block btn-lg">Sign up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="route-group text-center">
                            Already have an Instaurant account?
                            &nbsp;
                            <Link to="/signin" className="btn btn-default outline">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
