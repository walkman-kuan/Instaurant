/**
 * Get a list of categories that are affected by deleting a category.
 * The value of category being deleted is set to null, and the order of
 * each category that follows the category being deleted is decremented by 1.
 *
 * @param indexOfDeletedCategory is the index of the element being deleted in the array keys
 * @param keys is an array of IDs of all categories
 * @param categories is the current categories
 * @returns A list of categories that are affected by deleting a category
 */
export const getAffectedCategoriesOnDelete = (indexOfDeletedCategory, keys, categories) => (
    // prevUpdatedCategories is accumulator
    // key is the current element being processed
    // index is the index of the current elment being processed
    keys.reduce((prevUpdatedCategories, key, index) => {
        if (index === indexOfDeletedCategory) {
            return { ...prevUpdatedCategories, [key]: null };
        } else if (index > indexOfDeletedCategory) {
            return { ...prevUpdatedCategories,
                [key]: {
                    id: key,
                    name: categories[key].name,
                    order: categories[key].order - 1,
                },
            };
        }

        return prevUpdatedCategories;
    }, {})
);

/**
 * Remove the category being deleted, and update the orders of the other affected categories
 *
 * @param currentCategories is the list of categories before the deleting action
 * @param categoriesWithUpdatedOrder are other affected categories with updated orders
 * @param deletedCategoryId is id of the category being deleted
 * @returns A list of new categories of correct order after the deleting action
 */
const getRemainingCategories = (currentCategories, { categoriesWithUpdatedOrder, deletedCategoryId }) => {
    // Use Destructuring to remove the category being deleted from the current categories
    const { [deletedCategoryId]: deletedCategory, ...rest } = currentCategories;

    // Update the orders of other affected categories and return
    return { ...rest, ...categoriesWithUpdatedOrder };
};

export default getRemainingCategories;
