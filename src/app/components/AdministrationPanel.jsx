import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MenuContent from './MenuContent';
import { isUserSignedIn } from '../firebaseService';

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

    // If there is no signed-in user, redirect to the sign in page
    componentWillMount() {
        const { history } = this.props;
        if (!isUserSignedIn()) {
            history.replace('/signin');
        }
    }

    getCategoryList(categories) {
        const isEditing = this.state.sidebarStyle.isEditingCategory;
        // Keys only make sense in the outest array elements, e.g., <li>, not <a>
        return (
            categories.map(category => (
                <li key={category}>
                    <a
                      href={`#${category}`}
                      id={category}
                      className={isEditing ? 'disabled-link' : ''}
                    >
                        {category}
                    </a>
                    {isEditing &&
                        <div className="category-edit">
                            <span className="glyphicon glyphicon-pencil" />
                            <span className="glyphicon glyphicon-move" />
                        </div>
                    }
                </li>
        )));
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
        /*
        const categories = ['Chicken', 'Beef', 'Lamb', 'Pork', 'Duck',
            'Salad', 'Sushi', 'Ice Cream', 'Barrito', 'Tacco', 'Sandwich',
            'Fries', 'Poutine', 'Kabbo', 'Noddle', 'Dumpling', 'Pizza',
            'Pho', 'Pad Thai', 'Curry', 'Korean BBQ', 'Japanese BBQ',
            'Tea', 'Bottled Water', 'Wine', 'Beer', 'Juice'];
        */
        const categories = ['Chicken', 'Beef', 'Lamb', 'Pork', 'Duck', 'Salad', 'Sushi'];
        const listOfCategories = this.getCategoryList(categories);

        return (
            <div className="admin-page-wrapper">
                <NavBar onToggleSiderbar={this.handleToggleSidebar} />
                <SideBar
                  categories={listOfCategories}
                  sidebarStyle={this.state.sidebarStyle}
                  onCategoryEdit={this.handleEditCategory}
                />
                <MenuContent />
            </div>
        );
    }
}

AdministrationPanel.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AdministrationPanel;
