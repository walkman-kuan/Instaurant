import React from 'react';
import { Switch, Route } from 'react-router';

import IndexHome from './components/IndexHome';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import AdministrationPanel from './components/AdministrationPanel';
import Profile from './components/Profile';

export default (
    <Switch>
        {/* Routing to another component will UNMOUNT the current components! */}
        <Route exact path="/" component={IndexHome} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/admin" component={AdministrationPanel} />
        <Route path="/profile" component={Profile} />
    </Switch>
);
