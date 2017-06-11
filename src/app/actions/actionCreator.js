// All the sysnchronous action creators for Instaurant
import actionTypes from './actionTypes';

const receiveCategories = categories => (
    {
        type: actionTypes.RECEIVE_CATEGORY,
        categories,
    }
);

export default receiveCategories;
