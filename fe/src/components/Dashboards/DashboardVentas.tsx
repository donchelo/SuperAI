// src/components/Dashboards/DashboardVentas.tsx

import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  useTheme 
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Datos de ventas inventados
const ventasMensuales = [
  { mes: 'Ene', ventas: 4000, objetivo: 3000 },
  { mes: 'Feb', ventas: 3000, objetivo: 3000 },
  { mes: 'Mar', ventas: 5000, objetivo: 3000 },
  { mes: 'Abr', ventas: 2780, objetivo: 3000 },
  { mes: 'May', ventas: 1890, objetivo: 3000 },
  { mes: 'Jun', ventas: 2390, objetivo: 3000 },
  { mes: 'Jul', ventas: 3490, objetivo: 3000 },
];

const ventasPorProducto = [
  { nombre: 'Producto A', ventas: 12000 },
  { nombre: 'Producto B', ventas: 19000 },
  { nombre: 'Producto C', ventas: 3000 },
  { nombre: 'Producto D', ventas: 5000 },
];

const DashboardVentas: React.FC = () => {
  const theme = useTheme();

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
        Dashboard de Ventas
      </Typography>

      <Grid container spacing={3}>
        {/* KPIs */}
        <Grid item xs={12} md={3}>
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
              Total Ventas
            </Typography>
            <Typography component="p" variant="h4">
              $234,500
            </Typography>
            <Typography color="success.main" sx={{ flex: 1 }}>
              +15% vs. mes anterior
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
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
              Nuevos Clientes
            </Typography>
            <Typography component="p" variant="h4">
              45
            </Typography>
            <Typography color="success.main" sx={{ flex: 1 }}>
              +5% vs. mes anterior
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
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
              Tasa de Conversión
            </Typography>
            <Typography component="p" variant="h4">
              3.2%
            </Typography>
            <Typography color="error.main" sx={{ flex: 1 }}>
              -0.5% vs. mes anterior
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
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
              Ticket Promedio
            </Typography>
            <Typography component="p" variant="h4">
              $1,200
            </Typography>
            <Typography color="success.main" sx={{ flex: 1 }}>
              +8% vs. mes anterior
            </Typography>
          </Paper>
        </Grid>

        {/* Gráfico de Ventas Mensuales */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom component="div">
              Ventas Mensuales vs. Objetivo
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={ventasMensuales}
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
                <Bar dataKey="ventas" fill={theme.palette.primary.main} />
                <Bar dataKey="objetivo" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfico de Ventas por Producto */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom component="div">
              Ventas por Producto
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={ventasPorProducto}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardVentas;
