import React from 'react';

const AddCategoryButton = () => (
    <button
      type="button"
      className="sidebar-footer"
      data-toggle="modal"
      data-target="#add-category"
    >
        <span><span className="glyphicon glyphicon-plus" />&nbsp;Add a category</span>
    </button>
);

export default AddCategoryButton;
