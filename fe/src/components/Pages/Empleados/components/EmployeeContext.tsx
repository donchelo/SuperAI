import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Employee } from '../context/types';

interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch('/public/data/empleados.json')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error loading employees: ', error));
  }, []);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, id: (employees.length + 1).toString() }]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map(employee =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
