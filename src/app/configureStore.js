import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger'; // Logger with default options
import rootReducer from './reducers/rootReducer';

const instaurantStore = createStore(
    rootReducer,
    applyMiddleware(
        // A thunk is a function that wraps an expression to delay its evaluation
        thunkMiddleware, // Let us dispatch function
        loggerMiddleware, // Log action
    ),
);

export default instaurantStore;
