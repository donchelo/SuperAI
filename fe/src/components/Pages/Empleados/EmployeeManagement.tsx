import React, { useState } from 'react';

interface Employee {
  id: string;
  fullName: string;
  position: string;
  responsibility: string;
  reportsTo: string;
  startDate: string;
  endDate: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Employee>({
    id: '',
    fullName: '',
    position: '',
    responsibility: '',
    reportsTo: '',
    startDate: '',
    endDate: '',
  });

  const positions = ['CEO', 'CTO', 'CFO', 'Manager', 'Developer', 'Designer'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map((e) => (e.id === editingEmployee.id ? formData : e)));
      setEditingEmployee(null);
    } else {
      const newEmployee = { ...formData, id: Date.now().toString() };
      setEmployees([...employees, newEmployee]);
    }
    setIsFormOpen(false);
    setFormData({
      id: '',
      fullName: '',
      position: '',
      responsibility: '',
      reportsTo: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Gestión de Empleados</h1>
      <button 
        onClick={() => setIsFormOpen(true)}
        style={{ 
          padding: '10px 15px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        {editingEmployee ? 'Editar Empleado' : 'Agregar Empleado'}
      </button>

      {isFormOpen && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nombre Completo"
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Cargo"
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <select
            name="reportsTo"
            value={formData.reportsTo}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Seleccione a quién reporta</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          <textarea
            name="responsibility"
            value={formData.responsibility}
            onChange={handleChange}
            placeholder="Responsabilidad"
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button 
            type="submit"
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#008CBA', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            {editingEmployee ? 'Actualizar Empleado' : 'Agregar Empleado'}
          </button>
        </form>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {employees.map((employee) => (
          <li key={employee.id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '15px', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{employee.fullName}</h3>
            <p><strong>Cargo:</strong> {employee.position}</p>
            <p><strong>Reporta a:</strong> {employee.reportsTo}</p>
            <p><strong>Responsabilidad:</strong> {employee.responsibility}</p>
            <p><strong>Fecha de inicio:</strong> {employee.startDate}</p>
            <p><strong>Fecha de fin:</strong> {employee.endDate || 'No especificada'}</p>
            <button 
              onClick={() => handleEditEmployee(employee)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#FFA500', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                marginRight: '10px' 
              }}
            >
              Editar
            </button>
            <button 
              onClick={() => handleDeleteEmployee(employee.id)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeManagement;