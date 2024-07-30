import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Sale {
  fecha: string;
  Departamento: string;
  Ciudad: string;
  producto: string;
  precio: number;
}

const SalesByProductPieChart = () => {
  const salesData: Sale[] = [
    { fecha: '2022-01-01', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'V3', precio: 12000000 },
    { fecha: '2022-04-22', Departamento: 'Antioquia', Ciudad: 'Medellin', producto: 'Mini MATT', precio: 5800000 },
    // ... (otros datos)
  ];

  const years = [...new Set(salesData.map(sale => new Date(sale.fecha).getFullYear()))].sort();
  const [selectedYear, setSelectedYear] = useState<number>(years[years.length - 1]);

  const filteredSales = salesData.filter(sale => new Date(sale.fecha).getFullYear() === selectedYear);

  const salesByProduct = filteredSales.reduce<{ [key: string]: number }>((acc, sale) => {
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

  const formatValue = (value: number) => {
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
          <Tooltip formatter={(value: number) => formatValue(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByProductPieChart;
