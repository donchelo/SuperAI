import React from 'react';
import { TextField, Box, IconButton, Typography } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
const QuestionComponent = ({ category, field, label, value, error, editingField, handleChange, handleEditField, handleSaveField, }) => {
    const isEditing = editingField === `${category}-${field}`;
    return (React.createElement(Box, { sx: { mb: 2 } },
        React.createElement(Typography, { component: "label", htmlFor: field, sx: { display: 'block', mb: 1, fontWeight: 'bold', color: 'text.primary' } }, label),
        React.createElement(Box, { sx: { display: 'flex', alignItems: 'flex-start' } },
            React.createElement(TextField, { id: field, name: field, value: value, onChange: (e) => handleChange(category, field, e.target.value), multiline: true, rows: 3, variant: "outlined", fullWidth: true, error: Boolean(error), helperText: error, disabled: !isEditing, InputProps: {
                    style: { color: 'text.primary' },
                } }),
            React.createElement(IconButton, { onClick: () => isEditing ? handleSaveField(category, field) : handleEditField(category, field), sx: { ml: 1 } }, isEditing ? React.createElement(Check, null) : React.createElement(Edit, null)))));
};
export default QuestionComponent;
