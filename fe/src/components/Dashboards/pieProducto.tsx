import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SalesByProductPieChart = () => {
  const salesData = [
    {fecha: '2022-01-01', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V3', precio: 12000000},
    {fecha: '2022-04-22', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'Mini MATT', precio: 5800000},
    {fecha: '2022-05-28', Departamento: 'Huila', Ciudad: 'Garzon', producto: 'V4', precio: 9000000},
    {fecha: '2022-08-10', Departamento: 'Antioquia', Ciudad: 'Sabaneta', producto: 'V3', precio: 8000000},
    {fecha: '2022-12-31', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'TP', precio: 72800000},
    {fecha: '2023-01-16', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 11500000},
    {fecha: '2023-01-27', Departamento: 'Antioquia', Ciudad: 'Envigado', producto: 'V6', precio: 9000000},
    {fecha: '2023-03-23', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 9900000},
    {fecha: '2023-04-17', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V3', precio: 7000000},
    {fecha: '2023-05-26', Departamento: 'Antioquia', Ciudad: 'Itagui', producto: 'V6', precio: 9900000},
    {fecha: '2023-06-06', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 9900000},
    {fecha: '2023-06-09', Departamento: 'Santa Marta', Ciudad: 'Santa Marta', producto: 'V6', precio: 9900000},
    {fecha: '2023-06-28', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V3', precio: 7000000},
    {fecha: '2023-08-05', Departamento: 'Bogota', Ciudad: 'Bogota', producto: 'V6', precio: 5000000},
    {fecha: '2023-09-19', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 9900000},
    {fecha: '2023-09-23', Departamento: 'Antioquia', Ciudad: 'Envigado', producto: 'V6', precio: 11200000},
    {fecha: '2023-10-25', Departamento: 'Ibague', Ciudad: 'La samaria', producto: 'V6', precio: 7920000},
    {fecha: '2023-11-01', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'M1', precio: 4462500},
    {fecha: '2023-11-08', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 7920000},
    {fecha: '2023-11-10', Departamento: 'Antioquia', Ciudad: 'San antonio de prado', producto: 'V6', precio: 7920000},
    {fecha: '2023-11-23', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 9900000},
    {fecha: '2023-11-24', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 15345000},
    {fecha: '2023-12-05', Departamento: 'Antioquia', Ciudad: 'Bello', producto: 'M1', precio: 7500000},
    {fecha: '2023-12-11', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 7425000},
    {fecha: '2023-12-11', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'M1', precio: 7796250},
    {fecha: '2023-12-15', Departamento: 'Antioquia', Ciudad: 'Bello', producto: 'V6', precio: 7920000},
    {fecha: '2023-12-15', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 15840000},
    {fecha: '2023-12-28', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 7425000},
    {fecha: '2023-12-28', Departamento: 'Huila', Ciudad: 'La plata', producto: 'V6', precio: 7425000},
    {fecha: '2023-12-30', Departamento: 'Antioquia', Ciudad: 'Rionegro', producto: 'V6', precio: 7920000},
    {fecha: '2024-01-12', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 7920000},
    {fecha: '2024-01-17', Departamento: 'Antioquia', Ciudad: 'La estrella', producto: 'V4', precio: 7920000},
    {fecha: '2024-01-29', Departamento: 'Antioquia', Ciudad: 'Caldas', producto: 'V3', precio: 8910000},
    {fecha: '2024-02-01', Departamento: 'Antioquia', Ciudad: 'Bello', producto: 'V3', precio: 81900},
    {fecha: '2024-02-08', Departamento: 'Antioquia', Ciudad: 'La ceja', producto: 'V4', precio: 8910000},
    {fecha: '2024-02-14', Departamento: 'Antioquia', Ciudad: 'Itagui', producto: 'V4', precio: 9900000},
    {fecha: '2024-02-29', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 9900000},
    {fecha: '2024-03-01', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 8910000},
    {fecha: '2024-03-06', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 9900000},
    {fecha: '2024-03-11', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 8910000},
    {fecha: '2024-03-14', Departamento: 'Antioquia', Ciudad: 'Envigado', producto: 'V6', precio: 8910000},
    {fecha: '2024-04-03', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 9900000},
    {fecha: '2024-04-29', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 8910000},
    {fecha: '2024-04-30', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 8910000},
    {fecha: '2024-05-02', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V6', precio: 8910000},
    {fecha: '2024-05-05', Departamento: 'Inglaterra', Ciudad: 'Londres', producto: 'V6', precio: 9000000},
    {fecha: '2024-05-06', Departamento: 'Antioquia', Ciudad: 'Envigado', producto: 'M1', precio: 9355500},
    {fecha: '2024-05-15', Departamento: 'Antioquia', Ciudad: 'Bello', producto: 'V3', precio: 9900000},
    {fecha: '2024-05-23', Departamento: 'Valle del cauca', Ciudad: 'Cali', producto: 'V3', precio: 8910000},
    {fecha: '2024-05-24', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V3', precio: 8910000},
    {fecha: '2024-06-07', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 8910000},
    {fecha: '2024-06-20', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 8910000},
    {fecha: '2024-06-21', Departamento: 'Meta', Ciudad: 'Villavicencio', producto: 'V6', precio: 10400000},
    {fecha: '2024-06-27', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 9900000},
    {fecha: '2024-07-10', Departamento: 'Antioquia', Ciudad: 'Itagui', producto: 'V4', precio: 8000000},
    {fecha: '2024-07-12', Departamento: 'Antioquia', Ciudad: 'Bello', producto: 'V4', precio: 9900000},
    {fecha: '2024-07-16', Departamento: 'Antioquia', Ciudad: 'San Cristobal', producto: 'V6', precio: 9900000},
    {fecha: '2024-07-19', Departamento: 'Antioquia', Ciudad: 'San antonio de prado', producto: 'V4', precio: 9900000},
    {fecha: '2024-07-24', Departamento: 'Antioquia', Ciudad: 'Envigado', producto: 'V6', precio: 8910000},
    {fecha: '2024-07-26', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V4', precio: 9900000},
  ];

  const years = [...new Set(salesData.map(sale => new Date(sale.fecha).getFullYear()))].sort();
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);

  const filteredSales = salesData.filter(sale => new Date(sale.fecha).getFullYear() === selectedYear);

  const salesByProduct = filteredSales.reduce((acc, sale) => {
    if (!acc[sale.producto]) {
      acc[sale.producto] = 0;
    }
    acc[sale.producto] += sale.precio;
    return acc;
  }, {});

  const data = Object.entries(salesByProduct).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C'];

  const formatValue = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4">
        <label htmlFor="year-select" className="mr-2">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border rounded p-1"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatValue(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByProductPieChart;