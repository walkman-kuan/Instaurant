import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => (
    <div>
        <h1>This is the Reset Password page!</h1>
        Reset password successfully? <Link to="/signin">Sign In</Link>
    </div>
);

export default ResetPassword;
