import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  useTheme 
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { leerCSV, VentaData } from '../../services/csvService';

const DashboardVentasMensuales: React.FC = () => {
  const [ventasData, setVentasData] = useState<VentaData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await leerCSV('/src/data/ventas.csv');
        console.log("Datos cargados:", datos.length, datos);
        setVentasData(datos);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Error al cargar los datos. Por favor, intente de nuevo más tarde.');
      }
    };

    cargarDatos();
  }, []);

  // Procesar datos para ventas mensuales
  const ventasMensuales = ventasData.reduce((acc, item) => {
    const fecha = new Date(item.fecha);
    const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!acc[mes]) {
      acc[mes] = { mes, ventas: 0 };
    }
    acc[mes].ventas += item.precio;
    return acc;
  }, {} as Record<string, { mes: string; ventas: number }>);

  const ventasMensualesArray = Object.values(ventasMensuales).sort((a, b) => a.mes.localeCompare(b.mes));
  console.log("Ventas mensuales procesadas:", ventasMensualesArray);

  // Calcular KPIs
  const totalVentasAnual = ventasMensualesArray.reduce((sum, item) => sum + item.ventas, 0);
  const promedioVentasMensual = ventasMensualesArray.length > 0 ? totalVentasAnual / ventasMensualesArray.length : 0;
  
  const mesActual = ventasMensualesArray[ventasMensualesArray.length - 1];
  const mesAnterior = ventasMensualesArray[ventasMensualesArray.length - 2];
  const crecimientoMensual = mesAnterior && mesAnterior.ventas > 0 
    ? ((mesActual?.ventas || 0) - mesAnterior.ventas) / mesAnterior.ventas * 100 
    : 0;

  // Datos para el gráfico de pie
  const ventasPorProducto = ventasData.reduce((acc, item) => {
    if (!acc[item.producto]) {
      acc[item.producto] = 0;
    }
    acc[item.producto] += item.precio;
    return acc;
  }, {} as Record<string, number>);

  const ventasPorProductoArray = Object.entries(ventasPorProducto)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  console.log("KPIs calculados:", {
    totalVentasAnual,
    promedioVentasMensual,
    crecimientoMensual,
    ventasMesActual: mesActual?.ventas
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (ventasData.length === 0) {
    return <Typography>Cargando datos...</Typography>;
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3, 
      height: '100vh', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Dashboard de Ventas Mensuales
      </Typography>

      <Grid container spacing={3}>
        {/* KPIs */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" variant="overline">
              Total Ventas Anual
            </Typography>
            <Typography component="p" variant="h4">
              ${totalVentasAnual.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" variant="overline">
              Promedio Ventas Mensual
            </Typography>
            <Typography component="p" variant="h4">
              ${promedioVentasMensual.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" variant="overline">
              Crecimiento Mensual
            </Typography>
            <Typography component="p" variant="h4">
              {crecimientoMensual.toFixed(2)}%
            </Typography>
            <Typography color={crecimientoMensual >= 0 ? "success.main" : "error.main"} sx={{ flex: 1 }}>
              vs. mes anterior
            </Typography>
          </Paper>
        </Grid>

        {/* Gráfico de Ventas Mensuales */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom component="div">
              Ventas Mensuales
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={ventasMensualesArray}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfico de Ventas por Producto */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom component="div">
              Ventas por Producto
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={ventasPorProductoArray}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ventasPorProductoArray.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardVentasMensuales;