import React from 'react';
import AddDishThumbnail from './AddDishThumbnail';
import AddDishModal from './modals/AddDishModal';

const MenuContent = () => (
    <div id="menu-content" className="menu-content">
        <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
                Image 1
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
                Image 2
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
                Image 3
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
                Image 4
            </div>
            <AddDishThumbnail />
        </div>
        <AddDishModal />
    </div>
);

export default MenuContent;
