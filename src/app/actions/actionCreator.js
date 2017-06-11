// All the sysnchronous action creators for Instaurant
import actionTypes from './actionTypes';

export const receiveCategories = categories => (
    {
        type: actionTypes.RECEIVE_CATEGORY,
        categories,
    }
);

export const fetchingCategories = () => ({ type: actionTypes.FETCHING_CATEGORY });
