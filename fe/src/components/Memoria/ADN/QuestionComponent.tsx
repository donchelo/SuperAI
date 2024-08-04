import React from 'react';
import { TextField, Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';

interface QuestionComponentProps {
  category: string;
  field: string;
  label: string;
  value: string;
  error: string | null;
  editingField: string | null;
  handleChange: (category: string, field: string, value: string) => void;
  handleEditField: (category: string, field: string) => void;
  handleSaveField: (category: string, field: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  category,
  field,
  label,
  value,
  error,
  editingField,
  handleChange,
  handleEditField,
  handleSaveField,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isEditing = editingField === `${category}-${field}`;

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <Typography
        component="label"
        htmlFor={field}
        sx={{ display: 'block', mb: 1, fontWeight: 'bold', color: 'text.primary', fontSize: isMobile ? '1rem' : '1.25rem' }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <TextField
          id={field}
          name={field}
          value={value}
          onChange={(e) => handleChange(category, field, e.target.value)}
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          error={Boolean(error)}
          helperText={error}
          disabled={!isEditing}
          InputProps={{
            style: { color: theme.palette.text.primary },
          }}
          sx={{ mr: 1 }}
        />
        <IconButton 
          onClick={() => isEditing ? handleSaveField(category, field) : handleEditField(category, field)}
          sx={{ ml: 1, color: theme.palette.primary.main }}
        >
          {isEditing ? <Check /> : <Edit />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default QuestionComponent;
