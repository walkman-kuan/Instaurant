import * as firebase from "firebase"

// Initialize Firebase
var DefaultConfig = {
    apiKey: "AIzaSyBpRpP_p6-9wagoZRPbJpqoGkJD5028JFk",
    authDomain: "instaurant-72a63.firebaseapp.com",
    databaseURL: "https://instaurant-72a63.firebaseio.com",
    storageBucket: "instaurant-72a63.appspot.com",
};
// firebase is a global namespace from which all the Firebase services are accessed.
firebase.initializeApp(DefaultConfig);
