import React from 'react';
import ReactDom from 'react-dom';

import HomePage from './components/IndexHome';
import FirebaseApp from './firebaseService';

// Hacking to avoid refreshing page, we want hot reloading!
if (module.hot) {
    module.hot.accept();
}

ReactDom.render(<HomePage/>, document.getElementById('root'));
