import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';
import manageDishes from './dishReducer';
import manageCategries from './categoryReducer';

// The reducer managing the selected category
const selectedCategoryId = (state = '', action) => {
    switch (action.type) {
    case actionTypes.SELECT_CATEGORY:
        return action.selectedCategoryId;
    default:
        return state;
    }
};

// The reducer managing the selected dish
const selectedDishId = (state = '', action) => {
    switch (action.type) {
    case actionTypes.SELECT_DISH:
        return action.selectedDishId;
    default:
        return state;
    }
};

const configuredCategoryId = (state = '', action) => {
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
    selectedCategoryId,
    selectedDishId,
    configuredCategoryId,
});

export default rootReducer;
