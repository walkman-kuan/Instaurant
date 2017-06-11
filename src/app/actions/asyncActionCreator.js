// All the async action creators for Instaurant
import { fetchingCategories, receiveCategories } from './actionCreator';
import { fetchCategories } from '../firebaseService';

// Return {true} if we are not in the process of fetching, have already fetched before,
// or the list of fetched categories is not empty
const shouldFetchCategory = ({ isFetching, alreadyFetched, items }) => {
    // Object.keys(objName) returns an array of the given object's own enumerable properties
    if (isFetching || alreadyFetched || Object.keys(items).length > 0) {
        return false;
    }

    return true;
};

// Fetch categories from Firebase
const fetchCategoriesFromFirebase = uid => (dispatch) => {
    fetchCategories(uid).then((snapshot) => {
        const categories = {};
        // Get the data out of this snapshot if it contains any data
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                categories[data.key] = {
                    // data.key and data.val().id are the same
                    id: data.key,
                    name: data.val().name,
                    order: data.val().order,
                };
            });
        }

        dispatch(receiveCategories(categories));
    });
};

// Fetch categories from Firebase if necessary
const fetchCategoriesIfNeed = uid => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchCategoriesIfNeed(uid)).then()

    // Avoiding a network request if a cached value is already available
    if (shouldFetchCategory(getState().category)) {
        // Change the status isFetching to true
        dispatch(fetchingCategories());

        // Dispatch a thunk from thunk!
        return dispatch(fetchCategoriesFromFirebase(uid));
    }

    // Let the calling code know there's nothing to wait for
    return Promise.resolve();
};

export default fetchCategoriesIfNeed;
