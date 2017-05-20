import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div>
        <h1>This is the Home Page of the application!</h1>
        <Link to="/signin">Sign In</Link> and configure your application!
        <br />
        Need an Instaurant account? <Link to="/signup">Sign Up</Link>
    </div>
);
