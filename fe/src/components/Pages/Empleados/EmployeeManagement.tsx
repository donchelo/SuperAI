import React, { useState } from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { Button, Box } from '@mui/material';

const EmployeeManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <EmployeeProvider>
      <Box>
        <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>Add Employee</Button>
        <EmployeeList />
        {isFormOpen && <EmployeeForm onSave={() => setIsFormOpen(false)} />}
      </Box>
    </EmployeeProvider>
  );
};

export default EmployeeManagement;
