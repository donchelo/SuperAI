import axios from 'axios';
import { Employee } from '../context/types';

const API_URL = 'https://yourapiurl.com/employees';

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.put(`${API_URL}/${employee.id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
