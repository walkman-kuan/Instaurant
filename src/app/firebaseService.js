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

);
