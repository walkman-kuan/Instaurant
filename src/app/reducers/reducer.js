import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';

// The reducer managing the category state
const manageCategries = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.RECEIVE_CATEGORY:
        return action.categories;
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
    categories: manageCategries,
    dishes: manageDishes,
});

export default rootReducer;
