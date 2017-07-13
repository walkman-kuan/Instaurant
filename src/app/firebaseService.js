// The firebase specific requests are defined, and will be exported to the async action
// creator file.
import firebaseApp from './firebaseApp';

const firebaseAuth = firebaseApp.auth();
const firebaseDatabase = firebaseApp.database();
const fireaseStorage = firebaseApp.storage();

/**
 * Check whether there is a signed-in user
 *
 * @return {boolean.true} if user is signed-in
 */
export const isUserSignedIn = () => firebaseAuth.currentUser != null;

/**
 * Return the current signed-in user after sign in or sign up
 *
 * @return {firebase.User}
 */
export const getCurrentSignInUser = () => firebaseAuth.currentUser;

/**
 * Create a new Insturant owner account using email and password
 *
 * @param credentials contains an email address and a password
 * @returns {firebase.User}
 */
export const signUpWithEmailAndPassword = credentials =>
firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);

/**
 * Add an owner object to the Realtime Database
 *
 * @param ownerId is the uid of the owner of type of {firebase.User}
 * @return {firebase.Promise} containing void
 */
export const firebaseAddOwner = ownerId => firebaseDatabase.ref(`owners/${ownerId}`).set({ id: ownerId });

/**
 * Sign in an Insturant owner using email and password
 *
 * @param credentials contains an email address and a password
 * @returns {firebase.User}
 */
export const signInWithEmailAndPassword = credentials =>
firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password);

/**
 * Sign in an Insturant owner using email and password
 *
 * @param email is the email address with the password to be reset
 * @return {firebase.Promise} containing void
 */
export const sendPasswordResetEmail = email => firebaseAuth.sendPasswordResetEmail(email);

/**
 * Sign out the current Instaurant owner
 *
 * @return {firebase.Promise} containing void
 */
export const signOut = () => firebaseAuth.signOut();

/**
 * Fetech a list of ordered categories given the ownerId
 *
 * @param ownerId is the owner id
 * @return {firebase.Promise} containing the list of categories
 */
export const firebaseFetchCategories = ownerId => (
    firebaseDatabase.ref(`categories/${ownerId}`).orderByChild('order').once('value')
);

/**
 * Add a category given the ownerId, name, and order
 *
 * @param ownerId is the owner id
 * @param name is the category name
 * @param order is the caegory order within the existing category list
 * @return {firebase.Promise} containing the new category
 */
export const firebaseAddCategory = (ownerId, name, order) => {
    // Generates a new category location using a unique key and returns its Reference
    const newCategoryRef = firebaseDatabase.ref(`categories/${ownerId}`).push();
    // Update the empty location with a concrete category object
    newCategoryRef.update({
        id: newCategoryRef.key,
        name,
        order,
    });

    return newCategoryRef.once('value');
};

/**
 * Update the name of a category given the new name, its id and the owner id
 *
 * @param ownerId is the owner id
 * @param categoryId is id of the category
 * @param newName is the new category name
 * @return {firebase.Promise} containing the category who name is updated
 */
export const firebaseUpdateCategory = (ownerId, categoryId, newName) => {
    const categoryRef = firebaseDatabase.ref(`categories/${ownerId}/${categoryId}`);
    categoryRef.update({ name: newName });

    return categoryRef.once('value');
};


/**
 * Delete a category and update the orders of all categories that follow it
 *
 * @param ownerId is the owner id
 * @param affectedCategories is a list of categories that are affected by deleting a category
 * @return {firebase.Promise} containing void
 */
export const firebaseDeleteCategory = (ownerId, affectedCategories) => (
    firebaseDatabase.ref(`categories/${ownerId}`).update(affectedCategories)
);

/**
 * Fetech a list of ordered dishes given the category id
 *
 * @param configuredCategoryId is the categry id
 * @return {firebase.Promise} containing the list of dishes
 */
export const firebaseFetchDishes = configuredCategoryId => (
    firebaseDatabase.ref(`dishes/${configuredCategoryId}`).orderByChild('order').once('value')
);

/**
 * Add a dish given the configuredCategoryId, name, description, price, file, and order
 *
 * @param configuredCategoryId is the id of the associated category of the dish
 * @param name is the dish name
 * @param description is the dish description
 * @param price is the dish price
 * @param file is the dish image to be uploaded
 * @param order is the dish order within the existing dish list
 * @return {Promise} containing the new dish
 */
export const firebaseAddDish = (configuredCategoryId, name, description, price, file, order) => {
    // Generates a new dish location (Realtime Database) using a unique key and returns its Reference
    const newDishRef = firebaseDatabase.ref(`dishes/${configuredCategoryId}`).push();

    // Return a Promise so that we can consume the data
    return new Promise((resolve, reject) => {
        const id = newDishRef.key;
        // Upload the image to the Storage bucket at the specified location, and return
        // an uploadTask object that can be used to monitor and manage the upload
        const uploadTask = fireaseStorage.ref(`dishes/${id}/${file.name}`).put(file, { contentType: file.type });

        uploadTask.on('state_changed', null, (error) => {
            reject(error.code);
        }, () => {
            // Handle successful uploads on complete
            const dish = {
                id,
                name,
                description,
                price,
                imageUrl: uploadTask.snapshot.downloadURL,
                order,
            };
            // Update the empty location with a concrete dish object
            newDishRef.update(dish);
            resolve(dish);
        });
    });
};

/**
 * Update a dish given the configuredCategoryId, current editing dish, the updated dish
 * text info and the new image file
 *
 * @param configuredCategoryId is the id of the associated category of the dish
 * @param selectedDish is the currently editing dish
 * @param updatedDishTextInfo is the updated fish text info, e.g., name, description and price
 * @param file is the new dish image file
 * @return {Promise} containing the new dish
 */
export const firebaseUpdateDish = (configuredCategoryId, selectedDish, updatedDishTextInfo, file) => (
    // Return a Promise so that we can consume the data
    new Promise((resolve, reject) => {
        const id = selectedDish.id;
        let updatedDish = { ...selectedDish };
        const dishRef = firebaseDatabase.ref(`dishes/${configuredCategoryId}/${id}`);
        // If file isn't undefined, upload the new image file
        if (file) {
            // Upload the image to the Storage bucket at the specified location, and return
            // an uploadTask object that can be used to monitor and manage the upload
            const uploadTask = fireaseStorage.ref(`dishes/${id}/${file.name}`).put(file, { contentType: file.type });

            uploadTask.on('state_changed', null, (error) => {
                reject(error.code);
            }, () => {
                // Handle successful uploads on complete
                updatedDish = { ...updatedDish, imageUrl: uploadTask.snapshot.downloadURL };

                if (Object.keys(updatedDishTextInfo).length > 0) {
                    // Update the dish object
                    updatedDish = { ...updatedDish, ...updatedDishTextInfo };
                    dishRef.update(updatedDish);
                }
                resolve(updatedDish);
            });
        } else {
            // If file is undefined, updatedDishTextInfo must not be empty
            updatedDish = { ...updatedDish, ...updatedDishTextInfo };
            dishRef.update(updatedDish);
            resolve(updatedDish);
        }
    })
);

/**
 * In Realtime Database, delete a dish and update the orders of all dishes that follow it.
 * In Storage bucket, delete the related dish image
 *
 * @param configuredCategoryId is the id of currently configured category
 * @param affectedDishes is a list of dishes that are affected by deleting a dish
 * @param imageUrl is the long-lived HTTPS URL for the dish being deleted
 * @return {firebase.Promise} containing void
 */
export const firebaseDeleteDish = (configuredCategoryId, affectedDishes, imageUrl) => (
    // Update the dish list in Realtime Database, and execute a callback on complete
    firebaseDatabase.ref(`dishes/${configuredCategoryId}`).update(affectedDishes, () => {
        // Get a reference to the image being deleted using the https url
        // referencing it in the Storage bucket, and delete the image
        fireaseStorage.refFromURL(imageUrl).delete().then(() => {
            // Image deleted successfully
        }).catch((/* error */) => {
            // Uh-oh, an error occurred!
        });
    })
);
