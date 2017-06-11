// All the async action creators for Instaurant
import { fetchingCategories, receiveCategories } from './actionCreator';
import { fetchCategories } from '../firebaseService';

// Return true if there is not categories in the state tree.
// The Object.key() method returns an array of a given object's own enumerable properties
const shouldFetchCategory = state => (Object.keys(state.categories).length === 0);

// Fetch categories from Firebase
const fetchCategoriesFromFirebase = uid => (dispatch) => {
    fetchCategories(uid).then((snapshot) => {
        const categories = {};
        snapshot.forEach((data) => {
            categories[data.key] = {
                // data.key and data.val().id are the same
                id: data.key,
                name: data.val().name,
                order: data.val().order,
            };
        });
        dispatch(receiveCategories(categories));
    });
};

// Fetch categories from Firebase if necessary
const fetchCategoriesIfNeed = uid => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchCategoriesIfNeed(uid)).then()

    // Avoiding a network request if a cached value is already available
    if (shouldFetchCategory(getState())) {
        // Change the status isFetching to true
        dispatch(fetchingCategories());

        // Dispatch a thunk from thunk!
        return dispatch(fetchCategoriesFromFirebase(uid));
    }

    // Let the calling code know there's nothing to wait for
    return Promise.resolve();
};

export default fetchCategoriesIfNeed;
