import * as firebase from 'firebase';

// Firebase configuration for Instaurant
const firebaseConfig = {
    apiKey: 'AIzaSyBpRpP_p6-9wagoZRPbJpqoGkJD5028JFk',
    authDomain: 'instaurant-72a63.firebaseapp.com',
    databaseURL: 'https://instaurant-72a63.firebaseio.com',
    storageBucket: 'instaurant-72a63.appspot.com',
};

export default firebase.initializeApp(firebaseConfig);
