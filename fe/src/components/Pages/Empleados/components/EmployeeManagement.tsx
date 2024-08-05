import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { useEmployeeContext } from 'components/Pages/Empleados/components/EmployeeContext';
import { Employee } from '../context/types';

const EmployeeManagement: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { employees, addEmployee, updateEmployee } = useEmployeeContext();

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = (employee: Employee) => {
    if (employee.id) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
    setSelectedEmployee(null);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  return (
    <Box>
      <Button onClick={() => setSelectedEmployee({} as Employee)}>Add Employee</Button>
      {selectedEmployee !== null && (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <EmployeeList onEdit={handleEditEmployee} />
    </Box>
  );
};

export default EmployeeManagement;
