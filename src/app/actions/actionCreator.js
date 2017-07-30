// All the sysnchronous action creators for Instaurant
import actionTypes from './actionTypes';

export const receiveCategories = categories => (
    {
        type: actionTypes.RECEIVE_CATEGORY,
        categories,
    }
);

export const fetchingCategories = () => ({ type: actionTypes.FETCHING_CATEGORY });

export const addCategory = category => (
    {
        type: actionTypes.ADD_CATEGORY,
        category,
    }
);

export const selecteCategory = selectedCategoryId => (
    {
        type: actionTypes.SELECT_CATEGORY,
        selectedCategoryId,
    }
);

export const updateCategory = category => (
    {
        type: actionTypes.UPDATE_CATEGORY,
        category,
    }
);

export const deleteCategory = (categoriesWithUpdatedOrder, deletedCategoryId) => (
    {
        type: actionTypes.DELETE_CATEGORY,
        data: {
            categoriesWithUpdatedOrder,
            deletedCategoryId,
        },
    }
);

export const configureCategory = configuredCategoryId => (
    {
        type: actionTypes.CONFIGURE_CATEGORY,
        configuredCategoryId,
    }
);

export const receiveDishes = (configuredCategoryId, dishes) => (
    {
        type: actionTypes.RECEIVE_DISH,
        data: {
            configuredCategoryId,
            dishes,
        },
    }
);

export const fetchingDishes = configuredCategoryId => (
    {
        type: actionTypes.FETCHING_DISH,
        configuredCategoryId,
    }
);

export const changingDishes = configuredCategoryId => (
    {
        type: actionTypes.CHANGING_DISH,
        configuredCategoryId,
    }
);

export const addDish = (configuredCategoryId, dish) => (
    {
        type: actionTypes.ADD_DISH,
        data: {
            configuredCategoryId,
            dish,
        },
    }
);

export const selecteDish = selectedDishId => (
    {
        type: actionTypes.SELECT_DISH,
        selectedDishId,
    }
);

export const updateDish = (configuredCategoryId, updatedDish) => (
    {
        type: actionTypes.UPDATE_DISH,
        data: {
            configuredCategoryId,
            dish: updatedDish,
        },
    }
);

export const deleteDish = (configuredCategoryId, dishesWithUpdatedOrder, deletedDishId) => (
    {
        type: actionTypes.DELETE_DISH,
        data: {
            configuredCategoryId,
            dishesWithUpdatedOrder,
            deletedDishId,
        },
    }
);

export const deleteDishes = selectedCategoryId => (
    {
        type: actionTypes.DELETE_DISHES,
        selectedCategoryId,
    }
);
