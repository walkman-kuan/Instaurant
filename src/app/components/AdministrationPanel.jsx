import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MenuContent from './MenuContent';
import { isUserSignedIn, getCurrentSignInUser } from '../firebaseService';
import fetchCategoriesIfNeed from '../actions/asyncActionCreator';

class AdministrationPanel extends Component {
    constructor() {
        super();
        // Using React state for ephemeral state like UI stypes
        this.state = {
            sidebarStyle: {
                isWrapperHidden: true,
                wrapperStyle: {},
                isEditingCategory: false,
                navStyle: {},
            },
        };
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.handleEditCategory = this.handleEditCategory.bind(this);
    }

    // If there is no signed-in user, redirect to the sign in page.
    // This happens when user refresh page at .../admin
    componentWillMount() {
        const { history } = this.props;
        if (!isUserSignedIn()) {
            history.replace('/signin');
        } else {
            // Fetech list of categories if need
            const { dispatch } = this.props;
            dispatch(fetchCategoriesIfNeed(getCurrentSignInUser().uid));
        }
    }

    handleToggleSidebar() {
        // The new state depends on the prev state
        this.setState(prevState => ({
            sidebarStyle: {
                isWrapperHidden: !prevState.sidebarStyle.isWrapperHidden,
                wrapperStyle: prevState.sidebarStyle.isWrapperHidden ? { width: '90%' } : {},
                isEditingCategory: prevState.sidebarStyle.isEditingCategory,
            },
        }));
    }

    handleEditCategory() {
        this.setState(prevState => ({
            sidebarStyle: {
                isWrapperHidden: prevState.sidebarStyle.isWrapperHidden,
                wrapperStyle: prevState.sidebarStyle.wrapperStyle,
                isEditingCategory: !prevState.sidebarStyle.isEditingCategory,
            },
        }));
    }

    render() {
        return (
            <div className="admin-page-wrapper">
                <NavBar onToggleSiderbar={this.handleToggleSidebar} />
                <SideBar
                  categories={this.props.categories}
                  sidebarStyle={this.state.sidebarStyle}
                  onCategoryEdit={this.handleEditCategory}
                />
                <MenuContent />
            </div>
        );
    }
}

AdministrationPanel.propTypes = {
    categories: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ categories: state.categories });

export default connect(mapStateToProps)(AdministrationPanel);
