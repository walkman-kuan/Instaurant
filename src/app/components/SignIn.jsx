import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
    <div>
        <h1>This is the Sign In page!</h1>
        Forget your password? <Link to="/reset-password">Reset Password</Link>
        <br />
        Need an Instaurant account? <Link to="/signup">Sign Up</Link>
    </div>
);

export default SignIn;
