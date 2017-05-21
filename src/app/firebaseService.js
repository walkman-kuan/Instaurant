// The firebase specific requests are defined, and will be exported to the async action
// creator file.
import firebaseApp from './firebaseApp';

const firebaseAuth = firebaseApp.auth();
// const firebaseDatabase = firebaseApp.database();

/**
 * Check whether there is a signed-in user
 * @return true if user is signed-in
 */
export const isUserSignedIn = () => firebaseAuth.currentUser != null;

/**
 * Return the current signed-in user after sign in or sign up
 * @return {firebase.User}
 */
export const getCurrentSignInUser = () => firebaseAuth.currentUser;

/**
 * Create a new Insturant account using email and password
 *
 * @param user contains an email address and a password
 * @returns {firebase.User}
 */
export const signUpWithEmail = credentials =>
firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
