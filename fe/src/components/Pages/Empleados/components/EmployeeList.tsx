import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Employee } from '../context/types';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit }) => {
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
