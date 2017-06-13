import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';

// The reducer managing the category state
const manageCategries = (state = { isFetching: false, alreadyFetched: false, items: {} }, action) => {
    switch (action.type) {
    case actionTypes.FETCHING_CATEGORY:
        return { ...state, isFetching: true };
    case actionTypes.RECEIVE_CATEGORY:
        return { isFetching: false, alreadyFetched: true, items: action.categories };
    case actionTypes.ADD_CATEGORY:
        // Update nested objects in 'items'
        return { ...state, items: { ...state.items, [action.category.id]: action.category } };
    default:
        return state;
    }
};

// The reducer managing the dish state
const manageDishes = (state = {}, action) => {
    switch (action.type) {
    case 'EditStyleAction':
        return 'Hi';
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    category: manageCategries,
    dish: manageDishes,
});

export default rootReducer;
