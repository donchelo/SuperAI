import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Employee } from '../context/types';

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
  const { employees } = useEmployeeContext();

  if (employees.length === 0) {
    return <div>No employees found.</div>;
  }

  return (
    <Box>
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id}>
            <ListItemText primary={employee.fullName} secondary={employee.position} />
            <IconButton edge="end" onClick={() => onEdit(employee)}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmployeeList;
