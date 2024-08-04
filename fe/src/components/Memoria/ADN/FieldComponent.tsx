import React from 'react';
import { TextField, Box, IconButton, Typography, useTheme, useMediaQuery, Tooltip, Fade } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';

interface FieldComponentProps {
  category: string;
  field: string;
  label: string;
  value: string;
  error?: string;
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isEditing = editingField === `${category}-${field}`;

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Typography
        component="label"
        htmlFor={field}
        sx={{ 
          display: 'block', 
          mb: 1, 
          fontWeight: 'bold', 
          color: 'text.primary', 
          fontSize: isMobile ? '1rem' : '1.25rem',
          transition: 'color 0.3s',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
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
            style: { 
              color: theme.palette.text.primary,
              transition: 'all 0.3s',
            },
          }}
          sx={{ 
            mr: 1,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
              },
            },
          }}
        />
        <Tooltip title={isEditing ? "Guardar cambios" : "Editar campo"}>
          <IconButton 
            onClick={() => isEditing ? handleSaveField(category, field) : handleEditField(category, field)}
            sx={{ 
              ml: 1, 
              color: isEditing ? theme.palette.success.main : theme.palette.primary.main,
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: isEditing ? theme.palette.success.light : theme.palette.primary.light,
              },
            }}
            aria-label={isEditing ? "Guardar cambios" : "Editar campo"}
          >
            <Fade in={true}>
              {isEditing ? <Check /> : <Edit />}
            </Fade>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default React.memo(FieldComponent);
