import { combineReducers } from 'redux';

// The reducer managing the menu state
const editMenu = (state = {}, action) => {
    switch (action.type) {
    case 'EditAction':
        return 'Hi';
    default:
        return state;
    }
};

// The reducer managing the app style state
const editStyle = (state = {}, action) => {
    switch (action.type) {
    case 'EditStyleAction':
        return 'Hi';
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    menus: editMenu,
    editingStyle: editStyle,
});

export default rootReducer;
