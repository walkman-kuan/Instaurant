import update from 'immutability-helper';
// The update() accepts two parameters:
// The first one is the object/array that you want to mutate.
// The second parameter is an object that describes
//     WHERE the mutation should take place and
//     WHAT kind of mutation you want to make.

/**
 * Given the rendered <li> elements, update the orders of the corresponding state
 * object by looping through the list, finding the target state object using id of
 * a <li> element, and setting the object's order to (current index + 1)
 *
 * @param nodeList read-only live/static collection of <li> elements
 * @param elements the components with old order information
 * @returns components with new order information
 */

export const updateListElementsOrder = (nodeList, elements) => {
    let newElements = elements;
    for (let index = 0; index < nodeList.length; index += 1) {
        newElements = update(newElements, {
            // ES6 Computed Property Name - [nodeList[index].id]
            [nodeList[index].id]: {
                order: { $set: index + 1 },
            },
        });
    }

    return newElements;
};


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

// Prevent browser's default drag and drop behaviors
const stopPropgationAndPreventDefault = (event) => {
    event.stopPropagation();
    event.preventDefault();
};

/**
 * Add event listeners for the drag and drop events for a target element.
 *
 * @param eventTarget is the target of the drag and drop events.
 * @param dropEffect specifies the allowed operation, e.g., copy/move, and affects
 * the cursor type when the user hovers a target drop element.
 * @param dropCallback is executed after the draggable is dropped.
 * @param enterOrOverCallback is executed when the draggable enter and hover above the drop zone.
 * @param leaveOrDropCallback is executed when the draggable leave the drop zon, or the drag eneds.
 *
 * Note that we have trouble removing the listeners on componentWillMount because
 * we use Anonymous functions when adding event listeners.
 */
export const addDragAndDropListeners = (
    eventTarget, dropEffect, dropCallback, enterOrOverCallback, leaveOrDropCallback) => {
    ['dragenter', 'dragover'].forEach(
        individualEvent => eventTarget.addEventListener(individualEvent, (event) => {
            stopPropgationAndPreventDefault(event);
            event.dataTransfer.dropEffect = dropEffect;
            if (typeof enterOrOverCallback === 'function') {
                enterOrOverCallback();
            }
        }, false),
    );

    ['dragend', 'dragleave', 'dragexit'].forEach(
        individualEvent => eventTarget.addEventListener(individualEvent, (event) => {
            stopPropgationAndPreventDefault(event);
            if (typeof leaveOrDropCallback === 'function') {
                leaveOrDropCallback();
            }
        }, false),
    );

    eventTarget.addEventListener('drop', (event) => {
        stopPropgationAndPreventDefault(event);
        if (typeof dropCallback === 'function') {
            dropCallback(event);
        }
        if (typeof leaveOrDropCallback === 'function') {
            leaveOrDropCallback();
        }
    }, false);
};
