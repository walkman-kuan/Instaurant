// The firebase specific requests are defined, and will be exported to the async action
// creator file.

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
