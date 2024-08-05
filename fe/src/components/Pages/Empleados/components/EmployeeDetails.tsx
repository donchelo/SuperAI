import React from 'react';
import { useEmployeeContext } from './EmployeeContext';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Employee } from '../context/types';

const EmployeeDetails: React.FC = () => {
  const { employees } = useEmployeeContext();
  const { id } = useParams<{ id: string }>();
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return <Typography variant="h6">Employee not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">{employee.fullName}</Typography>
      <Typography variant="body1">Position: {employee.position}</Typography>
      <Typography variant="body1">Responsibility: {employee.responsibility}</Typography>
      <Typography variant="body1">Reports To: {employee.reportsTo}</Typography>
      <Typography variant="body1">Start Date: {employee.startDate}</Typography>
      <Typography variant="body1">End Date: {employee.endDate}</Typography>
      <Typography variant="body1">Area: {employee.area}</Typography>
    </Box>
  );
};

export default EmployeeDetails;
