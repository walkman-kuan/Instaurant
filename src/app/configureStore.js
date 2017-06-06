import { createStore /* applyMiddleware */ } from 'redux';
import rootReducer from './reducers/reducer';

// Used to hydrate client state using the state stored in the server, i.e., Firebase
const initailStateFromFirebase = {};

const instaurantStore = createStore(rootReducer, initailStateFromFirebase);

export default instaurantStore;
