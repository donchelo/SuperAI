import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Employee } from '../context/types';

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
  const { employees } = useEmployeeContext();

  const groupedEmployees = employees.reduce((acc: { [key: string]: Employee[] }, employee) => {
    if (!acc[employee.area]) {
      acc[employee.area] = [];
    }
    acc[employee.area].push(employee);
    return acc;
  }, {});

  return (
    <Box>
      {Object.keys(groupedEmployees).map(area => (
        <Box key={area}>
          <h2>{area}</h2>
          <List>
            {groupedEmployees[area].map(employee => (
              <div key={employee.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="edit" onClick={() => onEdit(employee)}>
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={employee.fullName} secondary={employee.position} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default EmployeeList;
