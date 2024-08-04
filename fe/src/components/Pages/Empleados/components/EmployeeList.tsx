import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Employee } from '../context/types';

const EmployeeList: React.FC = () => {
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
                <ListItem>
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
