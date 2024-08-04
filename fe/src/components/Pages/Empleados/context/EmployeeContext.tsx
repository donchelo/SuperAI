import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Employee } from './types';

interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within a EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
