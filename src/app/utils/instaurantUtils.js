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
export const getRemainingCategories = (currentCategories, { categoriesWithUpdatedOrder, deletedCategoryId }) => {
    // Use Destructuring to remove the category being deleted from the current categories
    const { [deletedCategoryId]: deletedCategory, ...rest } = currentCategories;

    // Update the orders of other affected categories and return.
    // Note that categoriesWithUpdatedOrder is an empty object {}
    // if we are deleting the last category
    return { ...rest, ...categoriesWithUpdatedOrder };
};

/**
 * Format the item name:
 * 1. Remove leading and trailing space(s)
 * 2. Replace multiple spaces with a single space
 * 3. Capitialize first character and lowercase non-first character(s) of each word
 *
 * This is helpful when saving category or dish name, e.g., we will format
 * ` caliFoNia rOLl  ` into `California Roll` when saving a dish name.
 */

export const formatItemName = unformattedItemName => (
    // Remove leading and trailing space(s) and replace multiple spaces with a single space
    unformattedItemName.trim().replace(/\s+/g, ' ').replace(
        // Capitialize first character and lowercase non-first character(s) of each word
        // \w\S matches any word character concatenated with non-whitespace characters
        /\w\S*/g, name => name.charAt(0).toUpperCase() + name.substr(1).toLowerCase(),
    )
);
