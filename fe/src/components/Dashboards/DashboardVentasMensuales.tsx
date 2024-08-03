import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { leerCSV, VentaData } from '../../services/csvService';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography, SelectChangeEvent, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import regression from 'regression';

const DashboardVentasMensuales: React.FC = () => {
  const [data, setData] = useState<VentaData[]>([]);
  const [yearFilter, setYearFilter] = useState<string>('todos');
  const [monthFilter, setMonthFilter] = useState<string>('todos');
  const [productFilter, setProductFilter] = useState<string>('todos');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ventas = await leerCSV('ventas');
        setData(ventas);
        setError(null);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const yearOptions = useMemo(() => {
    return ['todos', ...new Set(data.map((venta) => venta.fecha.substring(0, 4)))];
  }, [data]);

  const monthOptions = useMemo(() => {
    return ['todos', ...Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))];
  }, []);

  const productOptions = useMemo(() => {
    return ['todos', ...new Set(data.map((venta) => venta.producto))];
  }, [data]);

  const handleFilterChange = useCallback((filterType: 'year' | 'month' | 'product') => (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    switch (filterType) {
      case 'year':
        setYearFilter(value);
        break;
      case 'month':
        setMonthFilter(value);
        break;
      case 'product':
        setProductFilter(value);
        break;
    }
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((venta) => {
      const yearMatch = yearFilter === 'todos' || venta.fecha.startsWith(yearFilter);
      const monthMatch = monthFilter === 'todos' || venta.fecha.substring(5, 7) === monthFilter;
      const productMatch = productFilter === 'todos' || venta.producto === productFilter;
      return yearMatch && monthMatch && productMatch;
    });
  }, [data, yearFilter, monthFilter, productFilter]);

  const { chartData, totalSales, averageSale, yAxisDomain } = useMemo(() => {
    const processedData = filteredData.reduce((acc, venta) => {
      const month = venta.fecha.substring(0, 7);
      const precio = typeof venta.precio === 'number' ? venta.precio : parseFloat(venta.precio);
      if (!acc.months[month]) {
        acc.months[month] = { month, total: 0, count: 0 };
      }
      acc.months[month].total += precio;
      acc.months[month].count += 1;
      acc.totalSales += precio;
      acc.totalCount += 1;
      acc.maxSale = Math.max(acc.maxSale, acc.months[month].total);
      return acc;
    }, { months: {} as Record<string, { month: string, total: number, count: number }>, totalSales: 0, totalCount: 0, maxSale: 0 });

    const chartData = Object.values(processedData.months)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(({ month, total }) => ({ name: month, value: total }));
    
    const maxY = processedData.maxSale * 1.1;
    const yAxisDomain = [0, Math.ceil(maxY / 1000000) * 1000000];

    return {
      chartData,
      totalSales: processedData.totalSales,
      averageSale: processedData.totalSales / processedData.totalCount || 0,
      yAxisDomain,
    };
  }, [filteredData]);

  const trendLineData = useMemo(() => {
    const dataPoints = chartData.map((item, index) => [index, item.value] as [number, number]);
    const result = regression.linear(dataPoints);
    return result.points.map((point, index) => ({
      name: chartData[index].name,
      trendValue: point[1],
    }));
  }, [chartData]);

  const formatCOP = useCallback((value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>Dashboard de Ventas Mensuales</Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        justifyContent: 'space-between', 
        marginBottom: 4,
        gap: 2
      }}>
        <FormControl fullWidth={isMobile} style={{ minWidth: isMobile ? 'auto' : 120 }}>
          <InputLabel>Año</InputLabel>
          <Select value={yearFilter} onChange={handleFilterChange('year')}>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>{year === 'todos' ? 'Todos' : year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={isMobile} style={{ minWidth: isMobile ? 'auto' : 120 }}>
          <InputLabel>Mes</InputLabel>
          <Select value={monthFilter} onChange={handleFilterChange('month')}>
            {monthOptions.map((month) => (
              <MenuItem key={month} value={month}>{month === 'todos' ? 'Todos' : month}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={isMobile} style={{ minWidth: isMobile ? 'auto' : 120 }}>
          <InputLabel>Producto</InputLabel>
          <Select value={productFilter} onChange={handleFilterChange('product')}>
            {productOptions.map((product) => (
              <MenuItem key={product} value={product}>{product === 'todos' ? 'Todos' : product}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Resumen de Ventas</Typography>
        <Typography>Total de Ventas: {formatCOP(totalSales)}</Typography>
        <Typography>Promedio por Venta: {formatCOP(averageSale)}</Typography>
      </Box>
      <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: isMobile ? 10 : 30,
            left: isMobile ? 10 : 100,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke={theme.palette.divider} />
          <XAxis 
            dataKey="name" 
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 80 : 30}
            tick={{ fontSize: isMobile ? 10 : 12, fill: theme.palette.text.primary }}
          />
          <YAxis 
            domain={yAxisDomain}
            tickFormatter={(value) => formatCOP(value).replace(/COP\s?/, '')}
            width={isMobile ? 60 : 80}
            tick={{ fontSize: isMobile ? 10 : 12, fill: theme.palette.text.primary }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [formatCOP(value), name === 'value' ? 'Ventas' : 'Tendencia']}
            labelFormatter={(label) => `Mes: ${label}`}
            contentStyle={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
          />
          <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12, color: theme.palette.text.primary }} />
          <Line type="monotone" dataKey="value" name="Ventas" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="trendValue" name="Tendencia" data={trendLineData} stroke={theme.palette.secondary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default DashboardVentasMensuales;
