// All the async action creators for Instaurant
import {
    addCategory,
    fetchingCategories,
    receiveCategories,
    updateCategory,
    deleteCategory,
    addDish,
    fetchingDishes,
    receiveDishes,
    deleteDish,
} from './actionCreator';
import {
    firebaseAddCategory,
    firebaseFetchCategories,
    firebaseUpdateCategory,
    firebaseDeleteCategory,
    firebaseAddDish,
    firebaseFetchDishes,
    firebaseDeleteDish,
} from '../firebaseService';


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

// Fetch categories from Firebase, and return a promise
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

// Fetch categories from Firebase if needed
export const fetchCategoriesIfNeeded = ownerId => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchCategoriesIfNeed(ownerId)).then()

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

// Fetch dishes from Firebase, and return a promise
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

// Fetch dishes from Firebase if needed
export const fetchDishesIfNeeded = () => (dispatch, getState) => {
    // The return value can be accessed through dispatch(fetchDishesIfNeed(ownerId)).then()

    const configuredCategoryId = getState().configuredCategory;
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

export const addDishToFirebase = (categoryId, name, description, price, file, order) => (dispatch) => {
    firebaseAddDish(categoryId, name, description, price, file, order).then((dish) => {
        dispatch(addDish(categoryId, dish));
    });
};

export const deleteDishFromFirebase = (configuredCategoryId, affectedDishes, deletedDishId, imageUrl) => (dispatch) => {
    firebaseDeleteDish(configuredCategoryId, affectedDishes, imageUrl).then(() => {
        // Use Destructuring to remove the dish being deleted from the affected dishes
        const { [deletedDishId]: deletedDish, ...dishesWithUpdatedOrder } = affectedDishes;
        dispatch(deleteDish(configuredCategoryId, dishesWithUpdatedOrder, deletedDishId));
    });
};
