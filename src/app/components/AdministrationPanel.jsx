import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MenuContent from './MenuContent';
import ConfigureCategoryModal from './modals/ConfigureCategoryModal';
import AddCategoryModal from './modals/AddCategoryModal';
import EditCategoryModal from './modals/EditCategoryModal';
import RemoveCategoryModal from './modals/RemoveCategoryModal';
import { isUserSignedIn, getCurrentSignInUser } from '../firebaseService';
import { fetchCategoriesIfNeeded, fetchDishesIfNeeded } from '../actions/asyncActionCreator';
import { configureCategory } from '../actions/actionCreator';

class AdministrationPanel extends Component {
    constructor() {
        super();
        // Using React state for ephemeral state like UI stypes
        this.state = {
            sidebarStyle: {
                isWrapperHidden: true,
                wrapperStyle: {},
                isEditingCategories: false,
            },
        };
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.handleEditingCategories = this.handleEditingCategories.bind(this);
    }

    // If there is no signed-in user, redirect to the sign in page.
    // This happens when user refresh page at .../admin
    componentWillMount() {
        const { history } = this.props;
        if (!isUserSignedIn()) {
            history.replace('/signin');
        } else {
            // Fetech list of categories if need.
            // Note that render() will be called before fetchCategoriesIfNeed()
            // is resolved since fetchCategoriesIfNeed() is async
            const { dispatch } = this.props;
            dispatch(fetchCategoriesIfNeeded(getCurrentSignInUser().uid)).then(() => {
                // We have already fetch the configured categories (if any) successfully
                const { items } = this.props;
                if (Object.values(items).length > 0) {
                    // Set the configured category to the first one in the list
                    dispatch(configureCategory(Object.values(items)[0].id));
                    dispatch(fetchDishesIfNeeded());
                }
            });
        }
    }

    handleToggleSidebar() {
        // The new state depends on the prev state
        this.setState(prevState => (
            { ...prevState,
                sidebarStyle: { ...prevState.sidebarStyle,
                    isWrapperHidden: !prevState.sidebarStyle.isWrapperHidden,
                    wrapperStyle: prevState.sidebarStyle.isWrapperHidden ? { width: '90%' } : {},
                },
            }));
    }

    handleEditingCategories() {
        this.setState(prevState => (
            { ...prevState,
                sidebarStyle: { ...prevState.sidebarStyle,
                    isEditingCategories: !prevState.sidebarStyle.isEditingCategories,
                },
            }));
    }

    render() {
        const { alreadyFetched, items } = this.props;
        return (
            <div className="admin-page-wrapper">
                <NavBar onToggleSiderbar={this.handleToggleSidebar} />
                <SideBar
                  categories={items}
                  sidebarStyle={this.state.sidebarStyle}
                  onEditingCategories={this.handleEditingCategories}
                />
                <MenuContent />

                {/* Show the Configure Menu modal if, after fetching, there is no configured categories. */}
                {alreadyFetched && Object.keys(items).length < 1 && <ConfigureCategoryModal />}
                <AddCategoryModal />
                <EditCategoryModal />
                <RemoveCategoryModal />
            </div>
        );
    }
}

AdministrationPanel.propTypes = {
    items: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    alreadyFetched: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
    {
        alreadyFetched: state.category.alreadyFetched,
        items: state.category.items,
    }
);

export default connect(mapStateToProps)(AdministrationPanel);
