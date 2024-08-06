// src/components/SuperPrompt.tsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import empleados from '../../../public/data/empleados.json';

interface Empleado {
  id: string;
  nombre: string;
  puesto: string;
  departamento: string;
}

interface Venta {
  empleadoId: string;
  monto: number;
}

const SuperPrompt: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEmpleados(empleados);
    // Fetch ventas.csv
    fetch('/data/ventas.csv')
      .then(response => response.text())
      .then(text => {
        Papa.parse<Venta>(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => setVentas(result.data),
          error: (error: Error) => console.error('Error parsing ventas.csv:', error),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Combine the data
  const combinedData = empleados.map(empleado => {
    const ventasEmpleado = ventas.filter(venta => venta.empleadoId === empleado.id);
    const totalVentas = ventasEmpleado.reduce((sum, venta) => sum + venta.monto, 0);
    return { ...empleado, totalVentas };
  });

  return (
    <div>
      <h1>Información de Empleados y Ventas</h1>
      <ul>
        {combinedData.map(empleado => (
          <li key={empleado.id}>
            <strong>{empleado.nombre}</strong> ({empleado.puesto}, {empleado.departamento}) - Ventas Totales: ${empleado.totalVentas}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperPrompt;
