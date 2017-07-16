import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="container-fluid">
        <h1>This is the QR Code Page</h1>
        Back to menu configuration? <Link to="/admin">Menu Configuration</Link>
    </div>
);
