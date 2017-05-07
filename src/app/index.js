import React from 'react';
import ReactDom from 'react-dom';

import HomePage from './components/IndexHome';
import FirebaseApp from './firebaseService';

ReactDom.render(<HomePage/>, document.getElementById('root'));

console.log("The auth object is: ");
console.log(FirebaseApp.auth());
