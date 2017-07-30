import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// thunkMiddleware - A thunk is a function that wraps an expression to delay its evaluation
let middlewares = [thunkMiddleware];

// Conditionally apply the logger middleware
if (process.env.NODE_ENV === 'development') {
     // (...).default return a logger with default options
    const loggerMiddleware = require('redux-logger').default;
    middlewares = [...middlewares, loggerMiddleware];
}

const instaurantStore = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
);

export default instaurantStore;
