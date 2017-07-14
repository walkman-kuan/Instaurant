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
import Loader from './Loader';
import { isUserSignedIn, getCurrentSignInUser } from '../firebaseService';
import { fetchCategoriesIfNeeded, fetchDishesIfNeeded } from '../actions/asyncActionCreator';
import { configureCategory } from '../actions/actionCreator';

class AdministrationPanel extends Component {
    constructor() {
        super();
        // Using React state for ephemeral state like UI styles
        this.state = {
            isEditingCategories: false,
            isSidebarVisibleOnMobile: false,
        };
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.handleEditingCategories = this.handleEditingCategories.bind(this);
        this.handleConfiguringCategory = this.handleConfiguringCategory.bind(this);
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
                const { categories, configuredCategoryId } = this.props;
                if (Object.values(categories).length > 0) {
                    // If configuredCategoryId is NOT falsy, i.e., '', it means that we have already
                    // set a configuredCategoryId, and we are navigating back from a routing point.
                    // As a result, we should keep the previous configuredCategoryId so
                    // that users can see the dishes of the category that was previously
                    // editing before they went to other routing point.

                    // If configuredCategoryId is falsy, set the configured category to the first
                    // category in the list
                    if (!configuredCategoryId) {
                        dispatch(configureCategory(Object.values(categories)[0].id));
                    }
                    dispatch(fetchDishesIfNeeded());
                }
            });
        }
    }

    handleToggleSidebar() {
        // The new state depends on the prev state
        this.setState(prevState => (
            { ...prevState, isSidebarVisibleOnMobile: !prevState.isSidebarVisibleOnMobile }
        ));
    }

    handleEditingCategories() {
        this.setState(prevState => (
            { ...prevState, isEditingCategories: !prevState.isEditingCategories }
        ));
    }

    handleConfiguringCategory() {
        // If sidebar shows on mobile view, hide it, otherwise, do nothing
        if (this.state.isSidebarVisibleOnMobile) {
            this.setState(prevState => (
                { ...prevState, isSidebarVisibleOnMobile: !prevState.isSidebarVisibleOnMobile }
            ));
        }
    }

    render() {
        const {
            onCategoryFetched, categories,
            configuredCategoryId, dishes, isFetchingDishes, ischangingDishes,
        } = this.props;

        return (
            <div className="admin-page-wrapper">
                <NavBar onToggleSiderbar={this.handleToggleSidebar} />
                <SideBar
                  categories={categories}
                  sidebarStyle={this.state}
                  onEditingCategories={this.handleEditingCategories}
                  onConfiguringCategory={this.handleConfiguringCategory}
                />
                <MenuContent
                  dishes={dishes}
                  categoryName={categories[configuredCategoryId] ? categories[configuredCategoryId].name : ''}
                  isSidebarVisibleOnMobile={this.state.isSidebarVisibleOnMobile}
                />

                {/* Show the Configure Menu modal if, after fetching, there is no configured categories. */}
                {onCategoryFetched && Object.keys(categories).length < 1 && <ConfigureCategoryModal />}
                <AddCategoryModal />
                <EditCategoryModal />
                <RemoveCategoryModal />
                {(isFetchingDishes || ischangingDishes) && <Loader /> }
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
    onCategoryFetched: PropTypes.bool.isRequired,
    configuredCategoryId: PropTypes.string.isRequired,
    dishes: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
    })).isRequired,
    isFetchingDishes: PropTypes.bool.isRequired,
    ischangingDishes: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
    {
        onCategoryFetched: state.category.alreadyFetched,
        categories: state.category.items,
        configuredCategoryId: state.configuredCategoryId,
        dishes: state.dish[state.configuredCategoryId]
            ? state.dish[state.configuredCategoryId].items
            : {},
        isFetchingDishes: state.dish[state.configuredCategoryId]
            ? state.dish[state.configuredCategoryId].isFetching
            : false,
        ischangingDishes: state.dish[state.configuredCategoryId]
            ? state.dish[state.configuredCategoryId].isChanging
            : false,
    }
);

export default connect(mapStateToProps)(AdministrationPanel);
