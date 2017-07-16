/*
 * Define the Redux state shap for the owner app.
 * The state shape follows the ideas of avoid nesting data and flaten data structure, which is
 * presented at http://redux.js.org/docs/advanced/AsyncActions.html#designing-the-state-shape
 * Also, we embrace an object-based, not an array-based, data model for list data since it allows
 * us to manipulate, e.g., read/add/update/delete, list elements more effciently.
 *
 * The entities in this model are categories and dishes.
 */

const ownerReduxStateShape = {
    /* Actions: select a category or dish, and start editing/deleting */
    selectedCategoryId: 'selectedCategoryId',
    selectedDishId: 'selectedDishId',
    /* Actions: Highlight a category and configure its associated dish(es) */
    configuredCategoryId: 'configuredCategoryId',
    /**
     * Actions
     * 1. Add category
     *     1. ID is given by Firebase
     *     2. Name is given by owner
     *     3. Order = (length of list of categories) + 1
     * 2. Update category
     *     1. Name is updated by owner
     *     2. Order is updated, e.g., drag and drop, based on orders of re-rendered <li>'s within <ul>
     * 3. Delete category
     *     1. Order is updated by decrementing the orders of following categories by 1
     *     2. All associated dishes are deleted
     * 4. Fetch categories
     */
    category: {
        isFetching: false, // Are we fetching the categories now?
        alreadyFetched: true, // Have we fetched categories before?
        items: {
            category1Id: {
                id: 'idOfCategory1',
                name: 'nameOfCagegory1',
                order: 1, // displaying order within the list all categories
            },
            category2Id: {
                id: 'idOfCategory2',
                name: 'nameOfCagegory2',
                order: 2,
            },
            category3Id: {
                id: 'idOfCategory3',
                name: 'nameOfCagegory3',
                order: 3,
            },
            category4Id: {
                id: 'idOfCategory3',
                name: 'nameOfCagegory4',
                order: 4,
            },
        },
    },

    /**
     * Actions
     * 1. Add dish
     *     1. ID and Image URL are given by Firebase
     *     2. Name, Price and Description are given by owner
     *     3. Order = (length of list of dish) + 1
     * 2. Update dish
     *     1. Name, Price and Description are updated by owner
     *     2. Image URL is given by Firebase
     *     2. Order is updated, e.g., drag and drop, based on orders of re-rendered <li>'s within <ul>
     * 3. Delete dish
     *     1. Order is updated by decrementing the orders of following categories by 1
     * 4. Fetch dishes
     */
    dish: {
        category1Id: {
            isFetching: false, // Are we fetching the dish list now?
            alreadyFetched: true, // Have we already fetched the dish list before?
            isChanging: false, // Are we changing the dish list, e.g., add or edit a dish, or remove all dishes?
            items: {
                dish1Id: {
                    id: 'idOfDish1',
                    name: 'nameOfDish1',
                    price: 'priceOfDish1',
                    description: 'descriptionOfDish1',
                    imageUrl: 'urlOfImageOfDish1',
                    order: 1, // displaying order within the list of all dishes
                },
                dish2Id: {
                    id: 'idOfDish2',
                    name: 'nameOfDish2',
                    price: 'priceOfDish2',
                    description: 'descriptionOfDish2',
                    imageUrl: 'urlOfImageOfDish2',
                    order: 2,
                },
            },
        },
        category2Id: {
            isFetching: false,
            alreadyFetched: true,
            isChanging: false,
            items: {
                dish3Id: {
                    id: 'idOfDish3',
                    name: 'nameOfDish3',
                    price: 'priceOfDish3',
                    description: 'descriptionOfDish3',
                    imageUrl: 'urlOfImageOfDish3',
                    order: 1,
                },
                dish4Id: {
                    id: 'idOfDish4',
                    name: 'nameOfDish4',
                    price: 'priceOfDish4',
                    description: 'descriptionOfDish4',
                    imageUrl: 'urlOfImageOfDish2',
                    order: 2,
                },
            },
        },
    },
};

export default ownerReduxStateShape;
