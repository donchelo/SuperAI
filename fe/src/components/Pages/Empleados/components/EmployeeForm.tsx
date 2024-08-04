import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Employee } from '../context/types';

interface EmployeeFormProps {
  employee?: Employee;
  onSave: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave }) => {
  const { addEmployee, updateEmployee } = useEmployeeContext();
  const [formState, setFormState] = useState<Employee>(employee || {
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
    if (employee) {
      updateEmployee(formState);
    } else {
      addEmployee({ ...formState, id: Date.now().toString() });
    }
    onSave();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Full Name" name="fullName" value={formState.fullName} onChange={handleChange} fullWidth />
      <TextField label="Position" name="position" value={formState.position} onChange={handleChange} fullWidth />
      <TextField label="Responsibility" name="responsibility" value={formState.responsibility} onChange={handleChange} fullWidth />
      <TextField label="Reports To" name="reportsTo" value={formState.reportsTo} onChange={handleChange} fullWidth />
      <TextField label="Start Date" name="startDate" value={formState.startDate} onChange={handleChange} fullWidth />
      <TextField label="End Date" name="endDate" value={formState.endDate} onChange={handleChange} fullWidth />
      <TextField label="Area" name="area" value={formState.area} onChange={handleChange} fullWidth />
      <Button type="submit" variant="contained" color="primary">Save</Button>
    </Box>
  );
};

export default EmployeeForm;
