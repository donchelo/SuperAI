import React from 'react';
import { TextField, Box, IconButton, Typography } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';

interface FieldComponentProps {
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

const FieldComponent: React.FC<FieldComponentProps> = ({
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
  const isEditing = editingField === `${category}-${field}`;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography component="label" htmlFor={field} sx={{ display: 'block', mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
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
            style: { color: 'text.primary' },
          }}
        />
        <IconButton 
          onClick={() => isEditing ? handleSaveField(category, field) : handleEditField(category, field)}
          sx={{ ml: 1 }}
        >
          {isEditing ? <Check /> : <Edit />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default FieldComponent;
