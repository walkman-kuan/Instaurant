import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { isUserSignedIn } from '../firebaseService';

class AdministrationPanel extends Component {
    constructor() {
        super();
        this.state = {
            isSiderBarHidden: true,
            sidebarStyle: {},
        };
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    // If there is no signed-in user, redirect to the sign in page
    componentWillMount() {
        const { history } = this.props;
        if (!isUserSignedIn()) {
            history.replace('/signin');
        }
    }

    handleToggleSidebar() {
        const isSiderBarHidden = !this.state.isSiderBarHidden;
        const sidebarStyle = this.state.isSiderBarHidden ? { width: '90%' } : {};
        this.setState({ isSiderBarHidden, sidebarStyle });
    }

    render() {
        const categories = ['Chicken', 'Beef', 'Lamb', 'Pork', 'Duck',
            'Salad', 'Sushi', 'Ice Cream', 'Barrito', 'Tacco', 'Sandwich',
            'Fries', 'Poutine', 'Kabbo', 'Noddle', 'Dumpling', 'Pizza',
            'Pho', 'Pad Thai', 'Curry', 'Korean BBQ', 'Japanese BBQ',
            'Tea', 'Bottled Water', 'Wine', 'Beer', 'Juice'];
        const listOfCategories = categories.map(category => (
            <li key={category}><a href={`#${category}`} id={category}>{category}</a></li>
        ));

        return (
            <div className="admin-page-wrapper">
                <NavBar onToggleSiderbar={this.handleToggleSidebar} />
                <SideBar categories={listOfCategories} sidebarStyle={this.state.sidebarStyle} />
                <div id="menu-content" className="main-content">Panel</div>
            </div>
        );
    }
}

AdministrationPanel.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AdministrationPanel;
