import actionTypes from '../actions/actionTypes';
import { getRemainingCategories } from '../utils/instaurantUtils';

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

export default manageCategries;
