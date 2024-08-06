import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Snackbar, Tooltip } from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import EmployeeForm from './EmployeeForm';
import { useEmployeeContext } from 'components/Pages/Empleados/components/EmployeeContext';
import { Employee } from '../context/types';

const EmployeeManagement: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = useState<{ open: boolean, message: string }>({ open: false, message: '' });
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployeeContext();

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = (employee: Employee) => {
    if (employee.id) {
      updateEmployee(employee);
      setOpenSnackbar({ open: true, message: 'Employee updated successfully' });
    } else {
      addEmployee(employee);
      setOpenSnackbar({ open: true, message: 'Employee added successfully' });
    }
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employee.id);
      setOpenSnackbar({ open: true, message: 'Employee deleted successfully' });
    }
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search employees"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <Search />
            ),
          }}
        />
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setSelectedEmployee({ id: '', fullName: '', position: '', responsibility: '', reportsTo: '', startDate: '', endDate: '', area: '' } as Employee)}>
          Add Employee
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.fullName}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.area}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditEmployee(employee)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteEmployee(employee)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={selectedEmployee !== null} onClose={handleCancel}>
        <DialogTitle>{selectedEmployee?.id ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <EmployeeForm
              employee={selectedEmployee}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar({ open: false, message: '' })}
        message={openSnackbar.message}
      />
    </Box>
  );
};

export default EmployeeManagement;
