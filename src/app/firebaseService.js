// The firebase specific requests are defined, and will be exported to the async action
// creator file.

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

// Webpack hotloading will cause firebase app reinitialization
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
// const firebaseDatabase = firebaseApp.database();

/**
 * Check whether there is a signed-in user
 * @return true if user is signed-in
 */
export const isUserSignedIn = () => firebaseAuth.currentUser != null;

);
