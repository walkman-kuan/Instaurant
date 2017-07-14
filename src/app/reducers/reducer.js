import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';
import { getRemainingCategories, getRemainingDishes } from '../utils/instaurantUtils';

// The reducer managing the category state
const manageCategries = (state = { isFetching: false, alreadyFetched: false, items: {} }, action) => {
    switch (action.type) {
    case actionTypes.FETCHING_CATEGORY:
        return { ...state, isFetching: true };
    case actionTypes.RECEIVE_CATEGORY:
        return { isFetching: false, alreadyFetched: true, items: action.categories };
    case actionTypes.ADD_CATEGORY:
        // Use `...state.items` because of updating nested objects in 'items'
        return { ...state, items: { ...state.items, [action.category.id]: action.category } };
    case actionTypes.UPDATE_CATEGORY:
        return { ...state, items: { ...state.items, [action.category.id]: action.category } };
    case actionTypes.DELETE_CATEGORY:
        return { ...state, items: getRemainingCategories(state.items, action.data) };
    default:
        return state;
    }
};

// The reducer managing the dishes of a single category
const manageSingleCategoryDishes = (
    state = { isFetching: false, alreadyFetched: false, isChanging: false, items: {} }, action) => {
    switch (action.type) {
    case actionTypes.FETCHING_DISH:
        return { ...state, isFetching: true };
    case actionTypes.RECEIVE_DISH:
        return { ...state, isFetching: false, alreadyFetched: true, isChanging: false, items: action.data.dishes };
    case actionTypes.CHANGING_DISHES:
        return { ...state, isChanging: true };
    case actionTypes.ADD_DISH:
    case actionTypes.UPDATE_DISH: {
        const { dish } = action.data;
        return { ...state, isChanging: false, items: { ...state.items, [dish.id]: dish } };
    }
    case actionTypes.DELETE_DISH: {
        const { dishesWithUpdatedOrder, deletedDishId } = action.data;
        return { ...state, items: getRemainingDishes(state.items, dishesWithUpdatedOrder, deletedDishId) };
    }
    default:
        return state;
    }
};

// The reducer managing the dish state
const manageDishes = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.FETCHING_DISH:
    case actionTypes.RECEIVE_DISH:
    case actionTypes.CHANGING_DISHES:
    case actionTypes.ADD_DISH:
    case actionTypes.UPDATE_DISH:
    case actionTypes.DELETE_DISH: {
        // If action.data isn't undefined, get configuredCategoryId from action.data, otherwise, from action
        const configuredCategoryId = action.data ? action.data.configuredCategoryId : action.configuredCategoryId;
        return { ...state, [configuredCategoryId]: manageSingleCategoryDishes(state[configuredCategoryId], action) };
    }
    default:
        return state;
    }
};

// The reducer managing the selected category
const selectedCategory = (state = '', action) => {
    switch (action.type) {
    case actionTypes.SELECT_CATEGORY:
        return action.selectedCategoryId;
    default:
        return state;
    }
};

// The reducer managing the selected dish
const selectedDish = (state = '', action) => {
    switch (action.type) {
    case actionTypes.SELECT_DISH:
        return action.selectedDishId;
    default:
        return state;
    }
};

const configuredCategory = (state = '', action) => {
    switch (action.type) {
    case actionTypes.CONFIGURE_CATEGORY:
        return action.configuredCategoryId;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    category: manageCategries,
    dish: manageDishes,
    selectedCategory,
    selectedDish,
    configuredCategory,
});

export default rootReducer;
