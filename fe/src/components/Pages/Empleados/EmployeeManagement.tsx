import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { useEmployeeContext } from './context/EmployeeContext';
import { Employee } from './context/types';

const EmployeeManagement: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { employees } = useEmployeeContext();

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = () => {
    setSelectedEmployee(null);
    // Cualquier otra lógica que necesites ejecutar después de guardar
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    // Cualquier otra lógica que necesites ejecutar al cancelar
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
      <EmployeeList employees={employees} onEdit={handleEditEmployee} />
    </Box>
  );
};

export default EmployeeManagement;
