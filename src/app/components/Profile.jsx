import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div>
        <h1>This is the Profile Page of the application!</h1>
        Back to menu configuration? <Link to="/admin">Menu Configuration</Link>
    </div>
);
