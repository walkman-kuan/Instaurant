import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import InstaurantOwner from './components/InstaurantOwner';
import instaurantStore from './configureStore';

import './less/custom.less';

// Hacking to avoid refreshing page, we want hot reloading!
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

// <Provider> make the Redux store available to all container
// component deep in the application hierarchy.
ReactDom.render(
    <Provider store={instaurantStore}>
        <BrowserRouter>
            <InstaurantOwner />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
