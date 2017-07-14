import actionTypes from '../actions/actionTypes';
import { getRemainingDishes } from '../utils/instaurantUtils';

// The reducer managing the dishes of a single category
const manageSingleCategoryDishes = (
    state = { isFetching: false, alreadyFetched: false, isChanging: false, items: {} }, action) => {
    switch (action.type) {
    case actionTypes.FETCHING_DISH:
        return { ...state, isFetching: true };
    case actionTypes.RECEIVE_DISH:
        return { ...state, isFetching: false, alreadyFetched: true, isChanging: false, items: action.data.dishes };
    case actionTypes.CHANGING_DISH:
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
    case actionTypes.CHANGING_DISH:
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

export default manageDishes;
