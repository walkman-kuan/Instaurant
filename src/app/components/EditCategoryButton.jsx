import React from 'react';
import PropTypes from 'prop-types';

const EditCategoryButton = ({ isEditingCategories, onEditingCategories }) => (
    <button type="button" className="sidebar-footer non-shadow-outlline" onClick={onEditingCategories}>
        {isEditingCategories ? (
            <span><span className="glyphicon glyphicon-saved" />&nbsp;Complete editing</span>
        ) : (
            <span><span className="glyphicon glyphicon-edit" />&nbsp;Edit categories</span>
        )}
    </button>
);

EditCategoryButton.propTypes = {
    isEditingCategories: PropTypes.bool.isRequired,
    onEditingCategories: PropTypes.func.isRequired,
};

export default EditCategoryButton;
