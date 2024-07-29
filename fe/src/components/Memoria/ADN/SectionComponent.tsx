import React from 'react';
import { Paper, Box, Typography, CircularProgress, IconButton, Fade } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FieldComponent from './FieldComponent';

interface SectionComponentProps {
  section: { title: string; key: string; fields: [string, string][] };
  formData: Record<string, any>;
  expandedSections: Record<string, boolean>;
  handleChange: (category: string, field: string, value: string) => void;
  toggleSection: (section: string) => void;
  errors: Record<string, Record<string, string>>;
  editingField: string | null;
  handleEditField: (category: string, field: string) => void;
  handleSaveField: (category: string, field: string) => void;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  section,
  formData,
  expandedSections,
  handleChange,
  toggleSection,
  errors,
  editingField,
  handleEditField,
  handleSaveField,
}) => {
  const isExpanded = expandedSections[section.key];
  const sectionProgress = section.fields.filter(([field]) => formData[section.key]?.[field]).length / section.fields.length * 100;

  return (
    <Paper key={section.key} sx={{ mb: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onClick={() => toggleSection(section.key)}
      >
        <Typography variant="h6">{section.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress
            variant="determinate"
            value={sectionProgress}
            size={24}
            thickness={5}
            sx={{ mr: 1, color: 'primary.contrastText' }}
          />
          <IconButton sx={{ color: 'primary.contrastText' }}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <Fade in={isExpanded}>
        <Box sx={{ p: 2, display: isExpanded ? 'block' : 'none' }}>
          {section.fields.map(([fieldName, label]) => (
            <FieldComponent
              key={fieldName}
              category={section.key}
              field={fieldName}
              label={label}
              value={formData[section.key]?.[fieldName] || ''}
              error={errors[section.key]?.[fieldName]}
              editingField={editingField}
              handleChange={handleChange}
              handleEditField={handleEditField}
              handleSaveField={handleSaveField}
            />
          ))}
        </Box>
      </Fade>
    </Paper>
  );
};

export default SectionComponent;
