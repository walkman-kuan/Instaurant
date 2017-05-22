import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUserSignedIn } from '../firebaseService';

class AdministrationPanel extends Component {

    // If there is no signed-in user, redirect to the sign in page
    componentWillMount() {
        const { history } = this.props;
        if (!isUserSignedIn()) {
            history.replace('/signin');
        }
    }

    render() {
        return <h1>This is the Administration Panel page!</h1>;
    }
}

AdministrationPanel.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AdministrationPanel;
