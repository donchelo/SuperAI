import React, { useState } from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { Button, Box } from '@mui/material';
import { Employee } from './context/types';

const EmployeeManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  return (
    <EmployeeProvider>
      <Box>
        <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
          Add Employee
        </Button>
        <EmployeeList onEdit={handleEdit} />
        {isFormOpen && <EmployeeForm employee={editingEmployee} onSave={handleSave} />}
      </Box>
    </EmployeeProvider>
  );
};

export default EmployeeManagement;
