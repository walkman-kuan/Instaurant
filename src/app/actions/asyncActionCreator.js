// All the async action creators for Instaurant
import {
    addCategory,
    fetchingCategories,
    receiveCategories,
    updateCategory,
    deleteCategory,
    addDish,
} from './actionCreator';
import {
    firebaseAddCategory,
    firebaseFetchCategories,
    firebaseUpdateCategory,
    firebaseDeleteCategory,
    firebaseAddDish,
} from '../firebaseService';


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
const fetchCategoriesFromFirebase = ownerId => (dispatch) => {
    firebaseFetchCategories(ownerId).then((snapshot) => {
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
export const fetchCategoriesIfNeed = ownerId => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchCategoriesIfNeed(ownerId)).then()

    // Avoiding a network request if a cached value is already available
    if (shouldFetchCategory(getState().category)) {
        // Change the status isFetching to true
        dispatch(fetchingCategories());

        // Dispatch a thunk from thunk!
        return dispatch(fetchCategoriesFromFirebase(ownerId));
    }

    // Let the calling code know there's nothing to wait for
    return Promise.resolve();
};

export const addCategoryToFirebase = (ownerId, name, order) => (dispatch) => {
    firebaseAddCategory(ownerId, name, order).then((snapshot) => {
        const category = {
            id: snapshot.key,
            name: snapshot.val().name,
            order: snapshot.val().order,
        };
        dispatch(addCategory(category));
    });
};

export const updateCategoryName = (ownerId, categoryId, newName) => (dispatch) => {
    firebaseUpdateCategory(ownerId, categoryId, newName).then((snapshot) => {
        const category = {
            id: snapshot.key,
            name: snapshot.val().name,
            order: snapshot.val().order,
        };
        dispatch(updateCategory(category));
    });
};

export const deleteCategoryFromFirebase = (ownerId, affectedCategories, deletedCategoryId) => (dispatch) => {
    firebaseDeleteCategory(ownerId, affectedCategories).then(() => {
        // Use Destructuring to remove the category being deleted from the affected categories
        const { [deletedCategoryId]: deletedCategory, ...categoriesWithUpdatedOrder } = affectedCategories;
        dispatch(deleteCategory(categoriesWithUpdatedOrder, deletedCategoryId));
    });
};

export const addDishToFirebase = (categoryId, name, description, price, file, order) => (dispatch) => {
    firebaseAddDish(categoryId, name, description, price, file, order).then((dish) => {
        dispatch(addDish(categoryId, dish));
    });
};
