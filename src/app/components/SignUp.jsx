import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => (
    <div>
        <h1>This is the Sign Up page!</h1>
        Already have an Instaurant account? <Link to="/signin">Sign In</Link>
    </div>
);

export default SignUp;
