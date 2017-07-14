import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger'; // Logger with default options
import rootReducer from './reducers/rootReducer';

const instaurantStore = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // Let us dispatch function
        loggerMiddleware, // Log action
    ),
);

export default instaurantStore;
