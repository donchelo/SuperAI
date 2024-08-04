import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Employee } from '../context/types';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSave: () => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
  const { addEmployee, updateEmployee } = useEmployeeContext();
  const [formState, setFormState] = useState<Employee>({
    id: '',
    fullName: '',
    position: '',
    responsibility: '',
    reportsTo: '',
    startDate: '',
    endDate: '',
    area: ''
  });

  useEffect(() => {
    if (employee) {
      setFormState(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee && employee.id) {
      updateEmployee(formState);
    } else {
      addEmployee({ ...formState, id: Date.now().toString() });
    }
    onSave();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {employee ? 'Edit Employee' : 'Add New Employee'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formState.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Position"
            name="position"
            value={formState.position}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Responsibility"
            name="responsibility"
            value={formState.responsibility}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Reports To"
            name="reportsTo"
            value={formState.reportsTo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Area"
            name="area"
            value={formState.area}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formState.startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formState.endDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="button" onClick={onCancel} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {employee ? 'Update' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;