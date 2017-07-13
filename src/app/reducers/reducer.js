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

const manageDishesOfIndividualCategory = (state = {
    isFetching: false,
    isChanging: false,
    alreadyFetched: false,
    items: {} }) => (
    { ...state, isFetching: true }
);

// The reducer managing the dish state
const manageDishes = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.FETCHING_DISH:
        return {
            ...state,
            [action.configuredCategoryId]: manageDishesOfIndividualCategory(state[action.configuredCategoryId]),
        };
    case actionTypes.CHANGING_DISHES:
        return {
            ...state,
            [action.configuredCategoryId]: {
                ...state[action.configuredCategoryId], isChanging: true,
            },
        };
    case actionTypes.RECEIVE_DISH: {
        const { configuredCategoryId, dishes } = action.data;
        return {
            ...state,
            [configuredCategoryId]: {
                isFetching: false,
                isChanging: false,
                alreadyFetched: true,
                items: dishes,
            },
        };
    }
    case actionTypes.ADD_DISH: {
        const { categoryId, dish } = action.data;
        // state[categoryId] is undefined if first dish
        const items = state[categoryId] ? state[categoryId].items : {};
        return {
            ...state,
            [categoryId]: {
                ...state[categoryId],
                items: {
                    ...items, [dish.id]: dish,
                },
                isChanging: false,
            },
        };
    }
    case actionTypes.UPDATE_DISH: {
        const { configuredCategoryId, updatedDish } = action.data;
        return {
            ...state,
            [configuredCategoryId]: {
                ...state[configuredCategoryId],
                items: {
                    ...state[configuredCategoryId].items, [updatedDish.id]: updatedDish,
                },
                isChanging: false,
            },
        };
    }
    case actionTypes.DELETE_DISH: {
        const { configuredCategoryId, dishesWithUpdatedOrder, deletedDishId } = action.data;
        return {
            ...state,
            [configuredCategoryId]: {
                ...state[configuredCategoryId],
                items: getRemainingDishes(
                    state[configuredCategoryId].items, dishesWithUpdatedOrder, deletedDishId),
            },
        };
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
