// All the async action creators for Instaurant
import {
    addCategory,
    configureCategory,
    fetchingCategories,
    receiveCategories,
    updateCategory,
    deleteCategory,
    addDish,
    fetchingDishes,
    changingDishes,
    receiveDishes,
    updateDish,
    deleteDish,
    deleteDishes,
} from './actionCreator';
import {
    firebaseAddCategory,
    firebaseFetchCategories,
    firebaseUpdateCategory,
    firebaseDeleteCategory,
    firebaseAddDish,
    firebaseFetchDishes,
    firebaseUpdateDish,
    firebaseDeleteDish,
} from '../firebaseService';
import { getImageUrlsFromDishes } from '../utils/instaurantUtils';


// Return {true} if we are not in the process of fetching, have already fetched before,
// or the list of fetched items(categories/dishes) is not empty
const shouldFetchItem = (itemInfo = { isFetching: false, alreadyFetched: false, items: {} }) => {
    const { isFetching, alreadyFetched, items } = itemInfo;
    // Object.keys(objName) returns an array of the given object's own enumerable properties
    if (isFetching || alreadyFetched || Object.keys(items).length > 0) {
        return false;
    }

    return true;
};

/**
 * Note on the return value of the inner function of a Thunk.
 *
 * In JavaScript, Promise.then() returns a Promise.
 *
 * In Redux, dispatch(action) returns the action being dispatched, e.g., console.log(dispatch(myAction));
 * will log the 'myAction'.
 *
 * Redux Thunk makes the return value of the inner function of a Thunk available as the return value of dispatch!!!
 * For example, the return value of the inner function of the Thunk'fetchCategoriesFromFirebase' is a promise, e.g.,
 * firebaseFetchCategories(ownerId).then(...), and can be accessed by 'dispatch(fetchCategoriesFromFirebase())'.
 * In other words, we have firebaseFetchCategories(ownerId).then(...) == dispatch(fetchCategoriesFromFirebase()).
 * That's why we can call dispatch(fetchCategoriesFromFirebase()).then(...);
 */

// Fetch categories from Firebase, and then return a promise
const fetchCategoriesFromFirebase = ownerId => dispatch => (
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
    })
);

// Fetch categories from Firebase if needed, and then return a promise
export const fetchCategoriesIfNeeded = ownerId => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchCategoriesIfNeed(ownerId))

    // Avoiding a network request if a cached value is already available
    if (shouldFetchItem(getState().category)) {
        // Change the status isFetching to true
        dispatch(fetchingCategories());

        // Dispatch a thunk from thunk!
        return dispatch(fetchCategoriesFromFirebase(ownerId));
    }

    // Let the calling code know there's nothing to wait for
    return Promise.resolve();
};

// Add a category to Firebase
export const addCategoryToFirebase = (ownerId, name, order) => (dispatch) => {
    firebaseAddCategory(ownerId, name, order).then((snapshot) => {
        const category = {
            id: snapshot.key,
            name: snapshot.val().name,
            order: snapshot.val().order,
        };

        dispatch(addCategory(category));
        dispatch(configureCategory(category.id));
    });
};

// Send the updated category name to Firebase
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

// Delete a category and its associated dishes from Firebase, then return a promise
export const deleteCategoryFromFirebase = (ownerId, affectedCategories, deletedCategoryId) => (dispatch, getState) => {
    const dishes = getState().dish[deletedCategoryId] ? getState().dish[deletedCategoryId].items : {};
    const imageUrlArray = getImageUrlsFromDishes(dishes);

    dispatch(changingDishes(deletedCategoryId));
    return firebaseDeleteCategory(ownerId, affectedCategories, deletedCategoryId, imageUrlArray).then(() => {
        // Use Destructuring to remove the category being deleted from the affected categories
        const { [deletedCategoryId]: deletedCategory, ...categoriesWithUpdatedOrder } = affectedCategories;

        dispatch(deleteDishes(deletedCategoryId));
        dispatch(deleteCategory(categoriesWithUpdatedOrder, deletedCategoryId));
    });
};

// Fetch dishes from Firebase, and then return a promise
export const fetchDishesFromFirebase = configuredCategoryId => dispatch => (
    firebaseFetchDishes(configuredCategoryId).then((snapshot) => {
        const dishes = {};
        // Get the data out of this snapshot if it contains any data
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                dishes[data.key] = {
                    // data.key and data.val().id are the same
                    id: data.key,
                    name: data.val().name,
                    description: data.val().description,
                    price: data.val().price,
                    imageUrl: data.val().imageUrl,
                    order: data.val().order,
                };
            });
        }

        dispatch(receiveDishes(configuredCategoryId, dishes));
    })
);

// Fetch dishes from Firebase if needed, and then return a promise
export const fetchDishesIfNeeded = () => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchDishesIfNeed(ownerId))

    const configuredCategoryId = getState().configuredCategoryId;
    // configuredDishInfo is undefined when fetching dishes for a category for the first time
    const configuredDishInfo = getState().dish[configuredCategoryId];

    // Avoiding a network request if a cached value is already available
    if (shouldFetchItem(configuredDishInfo)) {
        // Change the status isFetching to true
        dispatch(fetchingDishes(configuredCategoryId));

        // Dispatch a thunk from thunk!
        return dispatch(fetchDishesFromFirebase(configuredCategoryId));
    }

    // Let the calling code know there's nothing to wait for
    return Promise.resolve();
};

// Add a dish to Firebase
export const addDishToFirebase = (configuredCategoryId, name, description, price, file, order) => (dispatch) => {
    dispatch(changingDishes(configuredCategoryId));
    firebaseAddDish(configuredCategoryId, name, description, price, file, order).then((dish) => {
        dispatch(addDish(configuredCategoryId, dish));
    });
};

// Send the updated dish info to Firebase
export const updateDishInfo = (configuredCategoryId, selectedDish, updatedDishInfo) => (dispatch) => {
    dispatch(changingDishes(configuredCategoryId));
    // Use Destructuring to get the new image (could be undefined), and
    // the updated dish text info (could be empty)
    const { image: newImage, ...updatedDishTextInfo } = updatedDishInfo;
    firebaseUpdateDish(configuredCategoryId, selectedDish, updatedDishTextInfo, newImage).then((updatedDish) => {
        dispatch(updateDish(configuredCategoryId, updatedDish));
    });
};

// Delete a dish from Firebase
export const deleteDishFromFirebase = (configuredCategoryId, affectedDishes, deletedDishId, imageUrl) => (dispatch) => {
    firebaseDeleteDish(configuredCategoryId, affectedDishes, imageUrl).then(() => {
        // Use Destructuring to remove the dish being deleted from the affected dishes
        const { [deletedDishId]: deletedDish, ...dishesWithUpdatedOrder } = affectedDishes;
        dispatch(deleteDish(configuredCategoryId, dishesWithUpdatedOrder, deletedDishId));
    });
};
