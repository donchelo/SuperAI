import React from 'react';
import { Paper, Box, Typography, CircularProgress, IconButton, Fade } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FieldComponent from './FieldComponent';
const SectionComponent = ({ section, formData, expandedSections, handleChange, toggleSection, errors, editingField, handleEditField, handleSaveField, }) => {
    const isExpanded = expandedSections[section.key];
    const sectionProgress = section.fields.filter(([field]) => formData[section.key]?.[field]).length / section.fields.length * 100;
    return (React.createElement(Paper, { key: section.key, sx: { mb: 2, overflow: 'hidden' } },
        React.createElement(Box, { sx: {
                p: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }, onClick: () => toggleSection(section.key) },
            React.createElement(Typography, { variant: "h6" }, section.title),
            React.createElement(Box, { sx: { display: 'flex', alignItems: 'center' } },
                React.createElement(CircularProgress, { variant: "determinate", value: sectionProgress, size: 24, thickness: 5, sx: { mr: 1, color: 'primary.contrastText' } }),
                React.createElement(IconButton, { sx: { color: 'primary.contrastText' } }, isExpanded ? React.createElement(ExpandLess, null) : React.createElement(ExpandMore, null)))),
        React.createElement(Fade, { in: isExpanded },
            React.createElement(Box, { sx: { p: 2, display: isExpanded ? 'block' : 'none' } }, section.fields.map(([fieldName, label]) => (React.createElement(FieldComponent, { key: fieldName, category: section.key, field: fieldName, label: label, value: formData[section.key]?.[fieldName] || '', error: errors[section.key]?.[fieldName], editingField: editingField, handleChange: handleChange, handleEditField: handleEditField, handleSaveField: handleSaveField })))))));
};
export default SectionComponent;
