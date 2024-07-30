import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { leerCSV, VentaData } from '../../services/csvService';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography, SelectChangeEvent } from '@mui/material';
import regression from 'regression';

const DashboardVentasMensuales: React.FC = () => {
  const [data, setData] = useState<VentaData[]>([]);
  const [yearFilter, setYearFilter] = useState<string>('');
  const [monthFilter, setMonthFilter] = useState<string>('');
  const [productFilter, setProductFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ventas = await leerCSV('/data/ventas.csv'); // Ajusta la ruta al archivo CSV
        setData(ventas);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setYearFilter(event.target.value as string);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonthFilter(event.target.value as string);
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    setProductFilter(event.target.value as string);
  };

  const filteredData = useMemo(() => {
    return data.filter((venta) => {
      const yearMatch = yearFilter ? venta.fecha.startsWith(yearFilter) : true;
      const monthMatch = monthFilter ? venta.fecha.substring(5, 7) === monthFilter : true;
      const productMatch = productFilter ? venta.producto === productFilter : true;
      return yearMatch && monthMatch && productMatch;
    });
  }, [data, yearFilter, monthFilter, productFilter]);

  const processedData = useMemo(() => {
    return filteredData.reduce((acc, venta) => {
      const month = venta.fecha.substring(0, 7); // Assuming 'fecha' is in 'YYYY-MM-DD' format
      if (!acc[month]) {
        acc[month] = { month, total: 0 };
      }
      acc[month].total += venta.precio;
      return acc;
    }, {} as Record<string, { month: string, total: number }>);
  }, [filteredData]);

  const chartData = useMemo(() => Object.values(processedData), [processedData]);

  const trendLineData = useMemo(() => {
    const dataPoints = chartData.map((item, index) => [index, item.total]);
    const result = regression.linear(dataPoints);
    return result.points.map((point, index) => ({
      month: chartData[index].month,
      total: point[1],
    }));
  }, [chartData]);

  const formatCOP = useCallback((value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard de Ventas Mensuales</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
          <InputLabel>Año</InputLabel>
          <Select value={yearFilter} onChange={handleYearChange}>
            <MenuItem value="">Todos</MenuItem>
            {[...new Set(data.map((venta) => venta.fecha.substring(0, 4)))].map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
          <InputLabel>Mes</InputLabel>
          <Select value={monthFilter} onChange={handleMonthChange}>
            <MenuItem value="">Todos</MenuItem>
            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((month) => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
          <InputLabel>Producto</InputLabel>
          <Select value={productFilter} onChange={handleProductChange}>
            <MenuItem value="">Todos</MenuItem>
            {[...new Set(data.map((venta) => venta.producto))].map((product) => (
              <MenuItem key={product} value={product}>{product}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5, right: 30, left: 100, bottom: 5, // Aumentamos el margen izquierdo
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatCOP(value).replace(/COP\s?/, '')} />
          <Tooltip formatter={(value: number) => formatCOP(value)} />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="total" data={trendLineData} stroke="#ff7300" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default DashboardVentasMensuales;