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
