import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="container-fluid">
        <h1>This is the Home Page</h1>
        <Link to="/signin">Sign In</Link> and configure your application!
        <br />
        Need an Instaurant account? <Link to="/signup">Sign Up</Link>
    </div>
);
