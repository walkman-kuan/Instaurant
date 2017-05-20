import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import InstaurantOwner from './components/InstaurantOwner';

import './less/custom.less';

// Hacking to avoid refreshing page, we want hot reloading!
if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    (<BrowserRouter>
        <InstaurantOwner />
    </BrowserRouter>), document.getElementById('root'));
